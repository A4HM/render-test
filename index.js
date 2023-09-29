const express = require('express')
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build copy'))

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  const n = persons.length
  const d = new Date()
  response.send(`<p>Phonebook has info for ${n} people</p>${d}<p></p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
  console.log("Request GET api/persons");
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((p) => p.id === Number(request.params.id))
  
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  console.log(`Request GET api/persons/${request.params.id}`);
})

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((p) => p.id !== Number(request.params.id))

  response.status(204).end()
  console.log(`Request DELETE api/persons/${request.params.id}`);

})

app.post('/api/persons', (request, response) => {
  const person = request.body
  
  if(!person.name || !person.number) {
    response.status(400).json({error: "a name and number must be given"})
  } 
  else if(persons.find(p => p.name === person.name)) {
    response.status(400).json({error: "name must be unique"})
  }
  else {
    person.id = Math.floor(Math.random()*1000)
    persons = persons.concat(person)
    response.status(201).json(person)
  }
  console.log(`Request POST api/persons`);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})