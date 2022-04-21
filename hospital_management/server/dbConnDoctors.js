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
    pool.query('SELECT * FROM csce310_doctors', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
  }

module.exports = {
    getDoctors,
}