import React from 'react';
import { useLocation } from 'react-router-dom';
import './Doctor.css';


function Doctor(){

    //useFetch('http://localhost:3000/doctor');
    const location = useLocation();

    return(
        <div className='doc_format'>
            <h1 className='doc_name'>
                {console.log(location.state)}
                Welcome, {`Dr. ${location.state[0].doctor_lname}`}.
            </h1>
            
            <h2 className='doc_field'>
                Field: {`${location.state[0].doctor_field}`}.
            </h2>

            <h2 className='doc_salary'>
                Salary: {`L${location.state[0].doctor_salary}`}.
            </h2>

            <div className='patients_list'>

            </div>

        </div>
    );
}

export default Doctor;