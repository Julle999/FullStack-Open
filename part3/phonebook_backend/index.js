require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./modles/person')
const person = require('./modles/person')
const app = express()


morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
      .then(p => {
        response.json(p)
      })
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
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    } else if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    console.log('henkilön lisäys onnistui')
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})