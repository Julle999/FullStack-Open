import { useState } from 'react'
import Person from './components/Person'
import Header from '../../kurssi-info/src/components/Header'

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
  const [searched, setSearched] = useState(false)
  //const [personsToShow, setPersonsToShow] = useState(persons)

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
    setSearched(true)
  }
  // thank you discord for .includes() above!!!
  const personsToShow = searchName != '' ? persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase())) : persons
  


  const addPerson = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
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
      <h2>Phonebook</h2>
      <div>filter shown with<input value={searchName} onChange={handleSearchChange} /></div>
      <Header name="add a new"/>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName}onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      
        {personsToShow.map(person =>
          <Person key={person.name} name={person.name} number={person.number}/>

        )}
      
    </div>
  )

}

export default App