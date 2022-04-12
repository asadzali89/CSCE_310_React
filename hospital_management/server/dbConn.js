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
      response.status(200).json(results.rows)
  })
}

module.exports = {
    getPatients,
    getPatientById,
}