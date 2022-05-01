// Vivian Zheng
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

//Get all the equipment in the table
const getEquipment = (req, res) => {
    // SQL query to get equipment, order by ascending order of equipment IDg
    pool.query('SELECT * FROM equipment ORDER BY equip_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// const getEquipmentById = (req, res) => {
//     const id = parseInt(req.params.equip_id)
  
//     pool.query('SELECT * FROM equipment WHERE equip_id = $1', [id], (error, results) => {
//         if (error) {
//             console.error(err.message);
//         }
//         res.status(200).json(results.rows)
//     })
// }

// const getEquipmentByModel = (req, res) => {
//     const model = req.params.model
//     pool.query('SELECT * FROM equipment WHERE model = $1', [model], (error, results) => {
//         if (error) {
//             throw error
//         }
//         return results.rows
//     })
// }

// const getEquipmentByName = (req, res) => {
//     const equip_name = req.params.equip_name
//     pool.query('SELECT * FROM equipment WHERE equip_name = $1', [equip_name], (error, results) => {
//         if (error) {
//             throw error
//         }
//         return results.rows
//     })
// }

const createEquipment = (req, res) => {
    const {equip_id, equip_name, model, brand, price, total_in_stock, checked_out} = req.body

    pool.query('INSERT INTO equipment (equip_id, equip_name, model, brand, price, total_in_stock, checked_out) VALUES($1, $2, $3, $4, $5, $6, $7)', 
    [equip_id, equip_name, model, brand, price, total_in_stock, 0], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment added with name: ${equip_name}`)
    })
}

const updateEquipment = (req, res) => {
    const {equip_id, equip_name, model, brand, price, total_in_stock, checked_out} = req.body

    pool.query('UPDATE equipment SET model=$1, brand=$2, price=$3, total_in_stock=$4, checked_out=$5 WHERE equip_id = $6', 
    [model, brand, price, total_in_stock, checked_out, equip_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment updated with name: ${equip_name}`)
    })
}

const deleteEquipment = (req, res) => {
    const {equip_id} = req.body

    pool.query('DELETE FROM equipment WHERE equip_id = $1',
    [equip_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment deleted with id: ${equip_id}`)
    })
}

module.exports = {
    getEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment
}