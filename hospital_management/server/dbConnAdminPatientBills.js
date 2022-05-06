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



const getAppt = (req, res) => {
    pool.query('SELECT * FROM appointments', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getApptBill = (req, res) => {
    pool.query('SELECT appt_bill FROM appointments', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// add new appointment

const addAppt = (req, res) => {

    const {appt_id, patient_id, doctor_id, appt_time, appt_room, appt_bill} = req.body

    pool.query('INSERT INTO appointments (appt_id, patient_id, doctor_id, appt_time, appt_room, appt_feedback, appt_bill) VALUES($1, $2, $3, $4, $5, $6, $7)', [appt_id, patient_id, doctor_id, appt_time, appt_room, "", appt_bill], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getApptBill,
    getAppt,
    addAppt
}