import React from "react";

const AdminPBReadOnlyRow = ({appt}) => {
    return (
        <tr>
            <td>{appt.appt_id}</td>
            <td>{appt.patient_id}</td>
            <td>{appt.doctor_id}</td>
            <td>{appt.appt_time}</td>
            <td>{appt.appt_room}</td>
            <td>{appt.appt_bill}</td>
        </tr>
    )
}

export default AdminPBReadOnlyRow