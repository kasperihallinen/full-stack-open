import { useState, useEffect } from 'react'

import personService from './services/persons'

const Filter = ({ filter, handleChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange} />
  </div>
)

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person, handleClick }) => (
  <div>
    {person.name} {person.number} 
    <button onClick={() => handleClick(person)}>delete</button>
  </div>
)

const Persons = ({ persons, handleClick }) => (
  <div>
    {persons.map(person => 
      <Person 
        key={person.id} 
        person={person} 
        handleClick={handleClick}>
      </Person>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson !== undefined) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
      if (confirmed) {
        updatePerson(foundPerson)
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const updatePerson = foundPerson => {
    const changedPerson = { ...foundPerson, number: newNumber }
    personService
      .update(foundPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => {
    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (!confirmed) {
      return
    }

    personService
      .deleteOne(person.id)
      .then(() => setPersons(persons.filter(p => p.id !== person.id)))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={addPerson} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}>
      </PersonForm>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleClick={deletePerson}></Persons>
    </div>
  )

}

export default App
