const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const db = require("./dbConn") // this line is used to connect to dbConn.js. For doctors, make a separate dbconn_doctors file
const dbDoc = require("./dbConnDoctors")
const app = express()
const PORT = 3001

var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// List all patients in json form
app.get('/patients', db.getPatients)

// Get patient through specific id
app.get('/patients/:id', db.getPatientById)

app.get('/', (req, res) => {
  res.json({Server: "Running"})
})

app.post('/patients', db.createPatient)

app.post('/login', db.emailPassLogin)

app.listen(PORT, () => {
  console.log(`\n Server running on localhost:${PORT}`)
})

// list the Doctors table
app.get('/doctors', dbDoc.getDoctors)
