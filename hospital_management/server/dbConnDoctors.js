const bcrypt = require('bcryptjs')
const pg = require('pg')
const Pool  = pg.Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'csce310project_doctors',
    password: 'password',
    port: 5432
})

const getDoctors = (req, res) => {
    pool.query('SELECT * FROM doctors', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getDoctorById = (req, res) => {
    const doctor_id = parseInt(req.params.doctor_id)

    pool.query('SELECT * FROM doctors WHERE doctor_id = $1', [doctor_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getPatientsByDoctorId = (req, res) => {
    const doctor_id = parseInt(req.params.doctor_id)

    pool.query('SELECT patient_id FROM appointments WHERE doctor_id = $1', [doctor_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getPatientsFeedbackDoctorId = (req, res) => {

    const doctor_id = parseInt(req.params.doctor_id)


    pool.query('SELECT patient_id, appt_feedback FROM appointments WHERE doctor_id = $1', [doctor_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getDoctors,
    getDoctorById,
    getPatientsByDoctorId,
    getPatientsFeedbackDoctorId,
}