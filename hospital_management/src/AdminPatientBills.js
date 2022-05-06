import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import './AdminPatientBills.css';
import {nanoid} from 'nanoid';
import AdminPBReadOnlyRow from './AdminPBComponents/AdminPBReadOnlyRow';

var appt_data;
function AdminPatientBills() {

    const [apptData, setApptData] = useState([]);

    const [addFormData, setAddFormData] = useState({
        appt_id: '',
        patient_id: '',
        doctor_id: '',
        appt_time: '',
        appt_room: '',
        appt_bill: ''
    });

    // fetch and display appointments table data
    const fetchAppts = () => {
        fetch('http://localhost:3001/getappts')
            .then(res => res.json())
            .then(json => setApptData(json));
    }

    useEffect(() => {
        fetchAppts();
    }, []);

    // INSERT NEW PATIENT

    const handleAddFormChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};

        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newAppt = {
            id: nanoid(),
            appt_id: addFormData.appt_id,
            patient_id: addFormData.patient_id,
            doctor_id: addFormData.doctor_id,
            appt_time: addFormData.appt_time,
            appt_room: addFormData.appt_room,
            appt_bill: addFormData.appt_bill
        };

        const requestOptions = {
            method: 'PUT',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newAppt)          // body = info for the piece of equipment to add (from newEquipment instance)
        }

        // Add the new equipment into the database/the table
        fetch('http://localhost:3001/addAppt', requestOptions)
            .then(res => res.json())
            .then(window.location.reload('false'));   

        //const newAppts = [...apptData, newAppt];

        //setApptData(newAppts);

    };

    // EDIT PATIENT everything



    return(
        <div className='appt_format' >
            <h1 className='admin'>
                Admin Page
            </h1>
            <h1 className='apptstable'>Appointments table:</h1>
            <div>
                <div className="appt_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Appt ID</th>
                                <th>Patient ID</th>
                                <th>Doctor ID</th>
                                <th>Appt Time</th>
                                <th>Appt Room</th>
                                <th>Appt Bill</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apptData.map((appt) => (
                                <AdminPBReadOnlyRow appt={appt}/>
                            ))}
                        </tbody>
                    </table>
                    </div>

                    <div className='add_form'>
                        <h2>Add a Patient</h2>
                        <form onSubmit={handleAddFormSubmit}>
                            <input type = "text" name = "appt_id" required = "required" placeholder='Enter an Appointment ID...' onChange={handleAddFormChange}/>
                            <input type = "text" name = "patient_id" required = "required" placeholder='Enter a Patient ID...' onChange={handleAddFormChange}/>
                            <input type = "text" name = "doctor_id" required = "required" placeholder='Enter a Doctor ID...' onChange={handleAddFormChange}/>
                            <input type = "text" name = "appt_time" required = "required" placeholder='Enter an Appointment time...' onChange={handleAddFormChange}/>
                            <input type = "text" name = "appt_room" required = "required" placeholder='Enter an Appointment room...' onChange={handleAddFormChange}/>
                            <input type = "text" name = "appt_bill" required = "required" placeholder='Enter an Appointment bill...' onChange={handleAddFormChange}/>
                            <button type="submit">Add</button>
                        </form>
                    </div>
            </div>
        </div>
    );
}

export default AdminPatientBills;

/*
<tbody>
                            <tr>
                                <td>11503</td>
                                <td>3</td>
                                <td>11</td>
                                <td>15:26</td>
                                <td>B206</td>
                                <td>feedback</td>
                                <td>$40</td>
                            </tr>
                        </tbody> 

*/