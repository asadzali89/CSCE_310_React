const express = require('express')
const bodyParser = require('body-parser')
const db = require("./dbConn")
const { pool } = require("./dbConn")

const app = express()
const PORT = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// List all patients in json form
app.get('/patients', db.getPatients)

// Get patient through specific id
app.get('/patients/:id', db.getUserById)

app.get('/', (req, res) => {
  res.json({Server: "Running"})
})

app.listen(3001, () => {
  console.log(`\n Server running on localhost:${PORT}`)
})
