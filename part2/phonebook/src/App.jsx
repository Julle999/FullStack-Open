import { useState } from 'react'
import Persons from './components/Persons'
import Header from '../../kurssi-info/src/components/Header'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    //console.log('käsittelee hakua')
    setSearchName(event.target.value)
  }
  // thank you discord for .includes() above!!!
  const personsToShow = searchName != '' ? persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase())) : persons
  


  const addPerson = (event) => {
    event.preventDefault()
    //console.log('Button clicked', event.target)
    const personObject = {
      name : newName,
      number : newNumber
    }
    const names = persons.map((person) => person.name)

    if (!names.includes(newName)) {

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
      //setNewName('')
    }
  } 

  


  return (
    <div>
      <Header name="Phonebook"/>
      <Filter value={searchName} onChange={handleSearchChange}/>
      <Header name="add a new"/>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numValue={newNumber} numOnChange={handleNumberChange}/>
      <Header name="Numbers"/>
      <Persons arr={personsToShow}/>
    </div>
  )

}

export default App