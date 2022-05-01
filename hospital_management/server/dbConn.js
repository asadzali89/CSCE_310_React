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

const deletePatient = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM patients WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        pool.query('DELETE FROM appointments WHERE patient_id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`All appointments of patient with id: ${id} deleted`)
        })
    })
}

const createPatient = (req, res) => {
    const {fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, password} = req.body
    const hash = bcrypt.hashSync(password, 12)
    const dupeEmail = pool.query('SELECT * FROM patients WHERE email = $1', [email], (err, dupeEmail) => {
        if (err) {
            throw err
        }
        if (dupeEmail.rows[0] == null) {
            pool.query('INSERT INTO patients (fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
            [fname, lname, dob, gender, street_addr, state, zip_code, email, phone_number, hash], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(201).send(`Patient added with email: ${email}`)
            })
        } else {
            throw error
        }
    })
}

const createAptmt = (req, res) => {
    const {patient_id, doctor_id, date} = req.body

    pool.query('INSERT INTO appointments (patient_id, doctor_id, date, bill, feedback) VALUES($1, $2, $3, $4, $5)', 
    [patient_id, doctor_id, date, 0.00, ''], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Appointment added for patient with id: ${patient_id}`)
    })
}

const getAptmt = (req, res) => {
    pool.query('SELECT * FROM appointments ORDER BY aptmt_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}
const getAptmtByPatientId = (req, res) => {
    const patient_id = parseInt(req.params.patient_id)
    pool.query('SELECT * FROM appointments WHERE patient_id = $1', [patient_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updatePatient = (req, res) => {
    const id = parseInt(req.params.id); 
    const {fname, lname, street_addr, email} = req.body;
    pool.query('UPDATE patients SET fname = $1, lname = $2, street_addr = $3, email = $4 WHERE id = $5', [fname, lname, street_addr, email, id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Patient with id: ${id} updated`)
    })
}

const updateAptmtDate = (req, res) => {
    const {date, aptmt_id} = req.body;
    pool.query('UPDATE appointments SET date = $1 WHERE aptmt_id = $2', [date, aptmt_id], (error, results) => {
        if (error) {
            res.status(400).send(error)
        }
        res.status(200).send(`Appointment with id: ${aptmt_id} updated`)
    })
}

const deleteAptmt = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM appointments WHERE aptmt_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Appointment with id: ${id} deleted`)
    })
}

const emailPassLogin = (req, res) => {
    const {email, password} = req.body;
    pool.query('SELECT * FROM patients WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(500).json(error)
            throw error
        }
        else if (results.rows[0] != null) {
            if (bcrypt.compareSync(password, results.rows[0].password)) {
                res.status(200).json({
                    id: results.rows[0].id,
                    email: results.rows[0].email
                })
            } else {
                res.status(200).json({
                    id: null,
                    email: results.rows[0].email
                })
            }
        } else {
            res.status(400).json({id: null})
        }
    })
    
}

const adminLogin = (req, res) => {
    const {email, password} = req.body;
    pool.query('SELECT * FROM admins WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(500).json(error)
            throw error
        }
        else if (results.rows[0] != null) {
            if (password == results.rows[0].password) {
                res.status(200).json({
                    id: results.rows[0].id,
                    email: results.rows[0].email
                })
            } else {
                res.status(200).json({
                    id: null,
                    email: results.rows[0].email
                })
            }
        } else {
            res.status(400).json({id: null})
        }
    })
}

module.exports = {
    getPatients,
    getPatientById,
    createPatient, 
    emailPassLogin,
    adminLogin,
    createAptmt,
    getAptmt,
    getAptmtByPatientId,
    updateAptmtDate,
    deleteAptmt,
    deletePatient, 
    updatePatient,
}