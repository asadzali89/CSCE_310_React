import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Appointment.css';



function Appointment(props){

  const navigate = useNavigate();
  const [docData, setdocData] = useState([]);
  const [aptmtData, setaptmtData] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:3001/doctors')
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        setdocData(docData => [...docData, data])
    })
    .catch(error => {
        console.error('There was an error!', error);
    });

    fetch('http://localhost:3001/appointments')
    .then(async response => {
        const data2 = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data2 && data2.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data2)
        setaptmtData(aptmtData => [...aptmtData, data2])
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const renderTableData = () => {
    return aptmtData[0].map((aptmt, index) => {
       const { aptmt_id, doctor_id, date, feedback } = aptmt //destructuring
       let doctor = docData[0].find(el => el.doctor_id === doctor_id)
       if (feedback == "") {
         return (
          <tr>
             <td>{aptmt_id}</td>
             <td>{'Dr. ' + doctor['doctor_lname']}</td>
             <td>{date.split('T')[0]}</td>
             <td>{"Awaiting appointment feedback..."}</td>
          </tr>
        )
       } else {
        return (
          <tr>
             <td>{aptmt_id}</td>
             <td>{date}</td>
             <td>{feedback}</td>
          </tr>
        )
       }

    })
  }

  const handleSubmit = (e) =>  {
    
    e.preventDefault();
    const formDetails = {
      "date" : date,
      "doctor_id" : doctor,
      "patient_id" : localStorage.getItem('patient_id')
    }
    console.log("The form was submitted with the following data:");
    console.log(formDetails);
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails) 
    };

    fetch('http://localhost:3001/appointments', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        alert("Appointment added")
        window.location.reload(false)
      })
      .catch(error => {
          console.error('There was an error!', error);
          alert("There was an error adding your appointment, please try again later")
      });
  }

  if(docData.length > 0) {
    return(
      <div>
        <h1>
          Appointments
        </h1>
        <form className="formFields" onSubmit={handleSubmit}>
          <div>
            <h2>Choose an appointment Date and Dr.</h2>
            <input
              type="date"
              id="date"
              className="formDateInput"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setDate(e.target.value)}
              required
            />
            <select name="aptmt" id="aptmt" className="formAptmtInput" defaultValue={'DEFAULT'} onChange={e => setDoctor(e.target.value)} required>
              <option value="DEFAULT" disabled>Select a Doctor</option>
              {docData[0].map(({ doctor_id, doctor_lname }, index) => <option value={doctor_id} >{doctor_lname}</option>)}
            </select>
          </div>
          <button className="formFieldButton">Set Appointment</button>
        </form>
        {aptmtData.length > 0 &&
          <h2>
            <table id='students'>
              <tbody><tr>
              <th>Appointment ID</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Feedback</th>
              </tr>
                {renderTableData()}
              </tbody>
            </table>
          </h2>
        }
      </div>
    );}
}


export default Appointment;
