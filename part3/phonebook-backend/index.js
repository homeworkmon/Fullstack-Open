/* eslint-disable no-unused-vars */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())

morgan.token('data', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    const info = `<p> Phonebook has info for ${persons.length} people </p>
    <br/>
    <p>${new Date()}</p>`
    response.send(info)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person ({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body

  Person.findByIdAndUpdate(request.params.id, { number }, {
    new: true,
    runValidators: true,
  })
    .then(updatedPerson => {
      response.json(updatedPerson)
      console.log(response.json(updatedPerson))
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id incorrect' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})