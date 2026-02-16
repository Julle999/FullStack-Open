import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
    const personObject = {
      name : newName
    }
    const names = persons.map((person) => person.name)

    if (!names.includes(newName)) {

      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
      //setNewName('')
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
                       onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
        {persons.map(person =>
          <Person key={person.name} name={person.name}/>

        )}
      
    </div>
  )

}

export default App