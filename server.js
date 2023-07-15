import express from "express"
import bcrypt from "bcrypt"
import knex from "knex"
import cors from "cors"

import { requestClarifai } from "./controllers/clarifai.js"

const PORT = 4000;
const server = express()

//Setting up middlewares
server.use(cors())
server.use(express.json())

//Set up server listening
server.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))


//Get clarifai example
server.put("/getImageData", requestClarifai)