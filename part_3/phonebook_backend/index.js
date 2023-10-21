require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (_, response) => {
    response.send('<h1>Hello World!</h1>')
})

// Group related route handlers together
app.get('/api/persons', async (_, response) => {
    const phonebook = await Phonebook.find()
    response.json(phonebook)
})

app.get('/api/persons/:id', async (request, response) => {
    const { id } = request.params
    const person = await Phonebook.findById(id)
    if (person) {
        response.status(200).json(person)
    } else {
        response.status(404).json({ message: 'No such person found.' })
    }
})

app.get('/info', async (_, response) => {
    const persons = await Phonebook.count()
    response.send(`<p> Phone book has info for ${persons} people <br/> ${new Date().toString()} </p>`)
})

app.delete('/api/persons/:id', async (request, response) => {
    const { id } = request.params
    await Phonebook.findByIdAndRemove(id)
    response.status(204).end()
})

app.post('/api/persons', async (request, response) => {
    const { name, number } = request.body
    if (!name) {
        response.status(400).json({ error: 'name is not provided.' })
    }
    if (!number) {
        response.status(400).json({ error: 'number is not provided.' })
    }
    const person = new Phonebook({
        number,
        name
    })
    const createdContact = await person.save()
    response.status(201).json({ message: 'Successfully added person', id: createdContact.id })
})

app.put('/api/persons/:id', async (request, response) => {
    const { name, number } = request.body
    const { id } = request.params
    const updatedPerson = await Phonebook.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true })
    response.status(200).json(updatedPerson)
})

const errorHandler = (error, _, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    return next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
const hostname = '0.0.0.0'
app.listen(PORT, hostname, () => {
    console.log(`Server running on port ${PORT}`)
})
