import React from 'react'

const DoctorReadOnlyRow = ({patient, handleEditClick, handleDeleteClick}) => {
    return (
        <tr>
            <td>{patient.patient_id}</td>
            <td>{patient.appt_id}</td>
            <td>{patient.appt_feedback}</td>
            <td>
                <button type='button' onClick={(event)=>handleEditClick(event, patient)}>Edit</button>
                <button type='button' onClick={() => handleDeleteClick(patient.patient_id, patient.appt_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default DoctorReadOnlyRow 