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

const getEquipment = (req, res) => {
    pool.query('SELECT * FROM equipment ORDER BY equip_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getEquipmentById = (req, res) => {
    const id = parseInt(req.params.equip_id)
  
    pool.query('SELECT * FROM equipment WHERE equip_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getEquipmentByModel = (model) => {
    pool.query('SELECT * FROM equipment WHERE model = $1', [model], (error, results) => {
        if (error) {
            throw error
        }
        return results.rows
    })
}

const createEquipment = (req, res) => {
    const {equip_id, equip_name, model, brand, price, total_in_stock, checked_out} = req.body

    pool.query('INSERT INTO equipment (equip_id, equip_name, model, brand, price, total_in_stock, checked_out) VALUES($1, $2, $3, $4, $5, $6, $7)', 
    [equip_id, equip_name, model, brand, price, total_in_stock, checked_out], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment added with name: ${equip_name}`)
    })
}



module.exports = {
    getEquipment,
    getEquipmentById,
    getEquipmentByModel,
    createEquipment
}