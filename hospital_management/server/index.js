const express = require('express')
const bodyParser = require('body-parser')
const { pool } = require("./dbConn")

const app = express()
const PORT = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// Backend Example Query //
// app.post('/patients/register', (req, res) => {
//     const {name, dob, email, password} = req.body
  
//     pool.query('INSERT INTO patients (name, dob, email, password) VALUES($1, $2, $3, $4)', 
//     [name, dob, email, password], (error, results) => {
//         if (error) {
//             throw error
//         }
//         res.redirect('/')
//     }
//   )
//   })

app.get('/', (req, res) => {
  res.json({Server: "Running"})
})

app.listen(3001, () => {
  console.log(`\n Server running on localhost:${PORT}`)
})
