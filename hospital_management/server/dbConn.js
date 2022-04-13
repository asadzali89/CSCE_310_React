const bcrypt = require('bcryptjs')
const pg = require('pg')
const Pool  = pg.Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
})

const getPatients = (req, res) => {
  pool.query('SELECT * FROM patients ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      res.status(200).json(results.rows)
  })
}

const getPatientById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM patients WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
      res.status(200).json(results.rows)
  })
}

const createPatient = (req, res) => {
    const {fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, password} = req.body
    const hash = bcrypt.hashSync(password, 12)
    pool.query('INSERT INTO patients (fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
        [fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, hash], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`Patient added with email: ${email}`)
        }
    )
}

module.exports = {
    getPatients,
    getPatientById,
    createPatient, 
}