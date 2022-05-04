// Vivian Zheng, EquipReadOnlyRow.js, 5/5/22

import React from 'react'

// Pass the equipment in as a prop (will get that item's data) and then use that data to render info in table
const EquipReadOnlyRow = ({ equipment, handleEditClick, handleDeleteClick, handleCheckInClick, handleCheckOutClick }) => {
    //Variables for disabling or enabling check in and check out buttons depending on availability
    var checkInButtonDisabled = false;
    var checkOutButtonDisabled = false;

    return (
        <tr key={equipment.equip_id}>
            <td>{equipment.equip_id}</td>
            <td>{equipment.equip_name}</td>
            <td>{equipment.model}</td>
            <td>{equipment.brand}</td>
            <td>${equipment.price}</td>
            <td>{equipment.total_in_stock}</td>
            <td>{equipment.checked_out}</td>
            <td>
                <button type="button" className="updateButton" onClick={(event) => handleEditClick(event,equipment)}>Update</button>
                <button type="button" className="deleteButton" onClick={(event) => handleDeleteClick(event, equipment.equip_id)}>Delete</button>

                {/* If the number of items checked out is 0, can't check anything in so disable check in button*/}
                {equipment.checked_out <= 0 ? checkInButtonDisabled=true : checkInButtonDisabled=false}
                {/* If the number of items checked out is equal to total in stock, can't check anything out so disable check out button*/}
                {equipment.checked_out >= equipment.total_in_stock ? checkOutButtonDisabled=true : checkOutButtonDisabled=false}

                <button type="button" disabled={checkInButtonDisabled} className="checkInButton" onClick={(event) => handleCheckInClick(event, equipment)}>Check In</button>
                <button type="button" disabled={checkOutButtonDisabled} className="checkInButton" onClick={(event) => handleCheckOutClick(event, equipment)}>Check Out</button>
            </td>
        </tr>
    )
}

export default EquipReadOnlyRow