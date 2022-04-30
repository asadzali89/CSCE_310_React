import React, { useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import './Doctor.css';
import DoctorEditableRow from './DoctorComponents/DoctorEditableRow';
import DoctorReadOnlyRow from './DoctorComponents/DoctorReadOnlyRow';

var p_id = "";

function Doctor(){

    const location = useLocation();

    const json_object = location.state.pass_pd_data;

    const [patients, setPatients] = useState(json_object);

    const [editFormData, seteditFormData] = useState({
        patient_id:"",
        appt_feedback: "",
    });

    const [editPatientId, setEditPatientId] = useState(null);
    
    //console.log(json_object)
    // making patient id array
    
    /*if(json_object.length > 1) {
        //console.log("long");
        for(var i = 0; i < json_object.length; i++) {
            p_id_arr.push(location.state.pass_pd_data[i].patient_id)
        }
    }*/

    // making patient feedback array
    /*var p_feedback_arr = []
    if(json_object.length > 1) {
        //console.log("long");
        for(var i = 0; i < json_object.length; i++) {
            p_feedback_arr.push(location.state.pass_pd_data[i].appt_feedback)
        }
    }*/

    const handleEditFormChange = (event) => {

        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        seteditFormData(newFormData);
    };

    const handleEditFormSubmit = (event)  => {
        event.preventDefault();
        const editedPatient = {
            patient_id: editPatientId,
            appt_feedback: editFormData.appt_feedback,
        }

        const newPatients = [...patients];
        const index = patients.findIndex((patient) => patient.patient_id === editPatientId );
        newPatients[index] = editedPatient;
        setPatients(newPatients);
        setEditPatientId(null);
    };

    const handleEditClick = (event, patient) => {
        event.preventDefault();
        setEditPatientId(patient.patient_id); // HERE, was patient.patient_id
        p_id = patient.patient_id;

        const formValues = {
            patient_id: patient.patient_id,
            appt_feedback: patient.appt_feedback,
        }

        seteditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditPatientId(null);
    };

    const handleDeleteClick = (patientId) => {
        const newPatients = [...patients];
    
        const index = patients.findIndex((patient) => patient.patient_id === patientId);
    
        newPatients.splice(index, 1);
    
        setPatients(newPatients);
    };

    return(
        <div className='doc_format'>
            <h1 className='doc_name'>
                
                Welcome, {`Dr. ${location.state.doc_data[0].doctor_lname}`}.
            </h1>
            
            <h2 className='doc_field'>
                Field: {`${location.state.doc_data[0].doctor_field}`}.
            </h2>

            <h2 className='doc_salary'>
                Salary: {`$${location.state.doc_data[0].doctor_salary}`}.
            </h2>

            <div className="patients_table">
            <h1>Your patients list:</h1>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Appointment Feedback</th>
                        <th>Feedback Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <Fragment>
                                {editPatientId === patient.patient_id ? (
                                    <DoctorEditableRow 
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange} 
                                        handleCancelClick = {handleCancelClick}
                                        />
                                ) : (
                                    <DoctorReadOnlyRow 
                                        patient={patient} 
                                        handleEditClick ={handleEditClick}
                                        handleDeleteClick = {handleDeleteClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>

        </div>
    );
}

export default Doctor;
export {p_id};
//{console.log(location.state.pass_pd_data[0].patient_id)}

//patients_array: {`${location.state.pass_pd_data.patient_id}`}