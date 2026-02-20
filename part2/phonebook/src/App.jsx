import { useState } from 'react'
import Persons from './components/Persons'
import Header from '../../kurssi-info/src/components/Header'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { useEffect } from 'react'
import axios from 'axios'
import bookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  
  useEffect(() => {
    console.log('effect')
    bookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
    //axios.get('http://localhost:3001/persons').then((response) => {
    //  console.log('promise fulfilled')
    //  setPersons(response.data)
    //})
  }, [])
  console.log('render',persons.length, 'persons')

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
          bookService
            .create(personObject)
            .then(returnedPerson => {
              console.log('post promise fullfilled')
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })
        } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const existingPerson = persons.find((p) => p.name === newName)
          console.log(existingPerson.id, existingPerson.name)
          axios
            .put(`http://localhost:3001/persons/${existingPerson.id}`,personObject)
            .then((response) => setPersons(persons.map((p) => p.id === existingPerson.id 
                                ? { ...p, number : newNumber}
                                : p)))
        }
  } 

  const deletePerson = (person) => {
    const poistetaanko = window.confirm(`Delete ${person.name} ${person.id}`)
    console.log(poistetaanko)
    if (poistetaanko) {
      console.log(`deleting ${person.name}`)
      bookService
        .del(person.id)
        .then((deletedPerson) => {
          setPersons(persons.filter((p) => p.id !== deletedPerson.id))
          console.log(deletedPerson.id)
          console.log('person ', person.name, ' deleted')
        })
    }
  }
  


  return (
    <div>
      <Header name="Phonebook"/>
      <Filter value={searchName} onChange={handleSearchChange}/>
      <Header name="add a new"/>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numValue={newNumber} numOnChange={handleNumberChange}/>
      <Header name="Numbers"/>
      <Persons arr={personsToShow} handleDelete={deletePerson}/>
    </div>
  )

}

export default App