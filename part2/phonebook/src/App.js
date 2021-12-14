import React, { useState, useEffect } from 'react'
import dbService from './services/persons'
import Search from './components/search'
import Form from './components/form'
import People from './components/people'
import Notification from './components/notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] =useState(null)
  const [messageClass, setMessageClass] = useState(null)

  useEffect(() => {
    dbService
      .getAll()
      .then(dbpersons => {
        setPersons(dbpersons)
      })

  }, [])

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = persons.filter(person => person.name === newName)
    if (person.length > 0 && person[0].number !==phone) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...person[0], number: phone }
        dbService
          .replace(changedPerson)
          .then(data => {
            if (data ===null){
              setMessageClass('error')
              setMessage(`${changedPerson.name} has already been removed from the server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            } else { setPersons(persons.map(person => person.id !== changedPerson.id ? person : data)) }
          })
          .catch(error => {
            setMessageClass('error')
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else if (person.length > 0 && person[0].number ===phone) {
      alert(`${newName} is already added to phonebook`)
    }
      else {
      const newPerson = {name: newName, number: phone}
      dbService
        .create(newPerson)
        .then(dbnewperson => {
          setPersons(persons.concat(dbnewperson))
          setMessageClass('notif')
          setMessage(`${dbnewperson.name} added successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessageClass('error')
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setPhone('')
  } 

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Do you want to delete ${person.name}?`)) { 
      setPersons(persons.filter(p => p.id !== id))
      dbService.makeDeletion(id) 
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search query={query} setQuery={setQuery}/>
      <h2>add a new</h2>
      <Notification message={message} messageClass={messageClass}/>
      <Form phone={phone} newName={newName} handleNoteChange={handleNoteChange} handlePhoneChange={handlePhoneChange} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <People persons={persons} query={query} handleDelete={handleDelete}/>
    </div>
  )
}

export default App