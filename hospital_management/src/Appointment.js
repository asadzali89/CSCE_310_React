import React from 'react';
import './Appointment.css';



function Appointment(props){
  // useEffect(() => {
  //   // GET request using fetch inside useEffect React hook
  //   fetch('http://localhost:3001/doctors')
  //   .then(async response => {
  //       const data = await response.json();

  //       // check for error response
  //       if (!response.ok) {
  //           // get error message from body or default to response statusText
  //           const error = (data && data.message) || response.statusText;
  //           return Promise.reject(error);
  //       }

  //       this.setState({ totalReactPackages: data.total })
  //   })
  //   .catch(error => {
  //       this.setState({ errorMessage: error.toString() });
  //       console.error('There was an error!', error);
  //   });
  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, []);

  return(
    <div>
      <h1>
        Appointments
      </h1>
      <form>
        <div>
          <h2>Choose an appointment date</h2>
          <input
            type="date"
            id="dob"
            className="formDateInput"
            name="dob"
            min={new Date().toISOString().split('T')[0]}
            required
          />
          <select name="aptmt" id="aptmt" className="formAptmtInput" defaultValue={'DEFAULT'} >
            <option value="DEFAULT" disabled>Select a Doctor</option>
            <option value="1">Dr. Seuss</option>
          </select>
          <h2>
              Your upcoming appointments:
          </h2>
        </div>
      </form>
    </div>
  );
}


export default Appointment;
