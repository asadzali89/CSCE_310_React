import React from 'react'

// Pass the equipment in as a prop (will get that item's data) and then use that data to render info in table
const EquipReadOnlyRow = ({ equipment, handleEditClick, handleDeleteClick }) => {
    return (
        <tr key={equipment.equip_id}>
            <td>{equipment.equip_id}</td>
            <td>{equipment.equip_name}</td>
            <td>{equipment.model}</td>
            <td>{equipment.brand}</td>
            <td>{equipment.price}</td>
            <td>{equipment.total_in_stock}</td>
            <td>{equipment.checked_out}</td>
            <td>
                <button type="button" className="updateButton" onClick={(event) => handleEditClick(event,equipment)}>Update</button>
                <button type="button" className="deleteButton" onClick={(event) => handleDeleteClick(event, equipment.equip_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default EquipReadOnlyRow