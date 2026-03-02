const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "1234567",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]

morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    const text = `Phonebook has info for ${persons.length} people`
    response.send(
        `<div>
            <p>${text}<p/>
            <p>${new Date()}<p/>
        <div/>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    console.log('deleted: ',id)
    response.status(204).end()
})

const generatedId = (max) => {
  let id = Math.floor(Math.random() * max)
  console.log(id)
  //const double = persons.find(p => p.id === String(id))
  
  
  while (persons.find(p => p.id === String(id))) {
    id = Math.floor(Math.random() * max)
    console.log(id)
  }
  return String(id)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    } else if (persons.find(p => p.name === body.name)) {
        return response.status(409).json({
            error: "name must be unique"
        })
    }
    
    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }

  const person = {
    name: body.name,
    number: body.number,
    id: generatedId(1000),
  }

  //const double = persons.find(p => p.name === person.name)

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})