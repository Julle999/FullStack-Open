const mongoose = require('mongoose')


const password = process.argv[2]
const args = process.argv.length

const url = `mongodb+srv://juliusgkoskelo_db_user:${password}@cluster0.wqtggi8.mongodb.net/phonebookApp?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const getAll = () => {
  Person.find({}).then(result => {
    console.log('phonebook')
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}

const addPerson = () => {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(result => {
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

switch (args) {
  case 2:
    console.log('give password as argument')
    process.exit(1)
    break
  case 3:
    getAll()
    break
  case 5:
    addPerson()
    break
  default:
    console.log('invalid command')
    process.exit(1)
}

//const url = `mongodb+srv://juliusgkoskelo_db_user:${password}@cluster0.wqtggi8.mongodb.net/phonebookApp?appName=Cluster0`
//mongoose.set('strictQuery', false)
//mongoose.connect(url, { family: 4 })
//
//const noteSchema = new mongoose.Schema({
//  content: String,
//  important: Boolean,
//})
//
//const Note = mongoose.model('Note', noteSchema)
//
//const note = new Note({
//  content: 'HTML is easy',
//  important: true,
//})
//
//Note.find({ important: true }).then(result => {
//  result.forEach(note => {
//    console.log(note)
//  })
//  mongoose.connection.close()
//})
//note.save().then(result => {
//  console.log('note saved!')
//  mongoose.connection.close()
//})