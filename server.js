import express from 'express'
import bcrypt from 'bcrypt'
import knex from 'knex'
import cors from 'cors'

import { requestClarifai } from './controllers/clarifai.js'
import { signIn } from './controllers/signin.js'
import { register } from './controllers/register.js'

const PORT = 4000
const server = express()

// Setting up middlewares
server.use(cors())
server.use(express.json())

// Set up server listening
server.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))

// Set up database
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'Julio11!#',
    database: 'Cloth_Recognition'
  }
})

// Get clarifai example
server.put('/getImageData', requestClarifai)
// Register new user
server.put('/register', register(db, bcrypt))
// SignIn user
server.put('/signin', signIn(db, bcrypt))
