import React from "react";

const AdminPBEditableRow = () => {
    return (
        <tr>
            <td>
                <input type = "text" name = "appt_id" required = "required" placeholder='Enter an Appointment ID...'></input>
            </td>
            <td>
            <input type = "text" name = "patient_id" required = "required" placeholder='Enter a Patient ID...'></input>
            </td>
            <td>
            <input type = "text" name = "doctor_id" required = "required" placeholder='Enter a Doctor ID...'></input>
            </td>
            <td>
            <input type = "text" name = "appt_time" required = "required" placeholder='Enter an Appointment Time...'></input>
            </td>
            <td><input type = "text" name = "appt_room" required = "required" placeholder='Enter an Appointment room...'></input></td>
            <td><input type = "text" name = "appt_bill" required = "required" placeholder='Enter an Appointment bill...'></input></td>

        </tr>
    )
}

export default AdminPBEditableRow