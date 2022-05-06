
var btn_type = "";

const DoctorReadOnlyRow = ({patient, handleEditClick, handleDeleteClick}) => {

    const onFinish = (event) => {
        let id = event.target.id;
        if(id === "edit_btn") {
            // Do for one
            console.log("edit button clicked");
            btn_type = "edit";
        } else {
            // For second
            console.log("add button clicked");
            btn_type = "add";
        }
    }


    return (
        <tr>
            <td>{patient.patient_id}</td>
            <td>{patient.appt_id}</td>
            <td>{patient.appt_feedback}</td>
            <td>
                <button type='button' id='edit_btn' onClick={(event)=>{onFinish(event); handleEditClick(event, patient);}}>Edit</button>
                <button type='button' id='add_btn' onClick={(event)=>{onFinish(event); handleEditClick(event, patient);}}>New</button>
                <button type='button' onClick={() => handleDeleteClick(patient.patient_id, patient.appt_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default DoctorReadOnlyRow;
export {btn_type};
