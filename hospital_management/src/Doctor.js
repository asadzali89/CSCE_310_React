import React, { useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import './Doctor.css';
import DoctorEditableRow from './DoctorComponents/DoctorEditableRow';
import DoctorReadOnlyRow from './DoctorComponents/DoctorReadOnlyRow';

var p_id = "";
var a_id = "";

function Doctor(){

    const location = useLocation();

    const json_object = location.state.pass_pd_data;

    const [patients, setPatients] = useState(json_object);

    const [editFormData, seteditFormData] = useState({
        patient_id:"",
        appt_id: "",
        appt_feedback: "",
    });

    const [editPatientId, setEditPatientId] = useState(null);
    const [editApptId, setEditApptId] = useState(null);

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
            appt_id: editApptId,
            appt_feedback: editFormData.appt_feedback,
        }

        const requestOptions = {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedPatient)
            
        }

        fetch('http://localhost:3001/editFeedbackGivenApptId', requestOptions)
        .then(res => res.json())
        .then(json => seteditFormData(json));


        const newPatients = [...patients];
        /*const newPatients = [...patients];
        const index = patients.findIndex((patient) => patient.appt_id === editPatientId );
        newPatients[index] = editedPatient;
        setPatients(newPatients);
        setEditPatientId(null);*/
    };

    const handleEditClick = (event, patient) => {
        event.preventDefault();
        setEditPatientId(patient.patient_id); // HERE, was patient.patient_id
        setEditApptId(patient.appt_id);
        p_id = patient.patient_id;
        a_id = patient.appt_id;

        const formValues = {
            patient_id: patient.patient_id,
            appt_id: patient.appt_id,
            appt_feedback: patient.appt_feedback,
        }

        console.log(editApptId);

        seteditFormData(formValues);

    };

    const handleCancelClick = () => {
        setEditPatientId(null);
    };

    const handleDeleteClick = (patientId, apptId) => {
        //const newPatients = [...patients];
    
        //const index = patients.findIndex((patient) => patient.patient_id === patientId);

        const editedPatient = {
            patient_id: patientId,
            appt_id: apptId,
            appt_feedback: null,

        }

        console.log(editedPatient);

        const requestOptions = {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedPatient)
            
        }

        fetch('http://localhost:3001/deleteFeedbackGivenApptId', requestOptions)
        .then(res => res.json())
        .then(json => seteditFormData(json));
        
    
        //newPatients.splice(index, 1);
    
        //setPatients(newPatients);
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

            <div className='equip_link'>
            <Link activeClassName="active" to={'/Equipment'}>
            <a >Equipment</a>
            </Link>
            </div>

            <div className="patients_table">
            <h1>Your patients list:</h1>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Appointment ID</th>
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
export {a_id};
