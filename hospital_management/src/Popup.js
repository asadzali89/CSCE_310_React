import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';


const Popup = (props) => {
    const navigate = useNavigate(); 
    const [title, setTitle] = useState('');
    const [doctorinfo, setDoctorinfo] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the page from being refreshed. might want to remove this to refresh page to load doctor id page
        const input = {title};
        console.log(input.title);
        fetch(`http://localhost:3001/doctors/${input.title}`)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            console.log(data)
            const toDoctorPage = () => { 
                navigate('/doctor', {state: data})
            }
            toDoctorPage();

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    return (
        <div className='popup-box'>
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <label for = 'doc_ID' className='popup-label'>Enter Doctor ID:</label>
                    <input
                        type="text" 
                        className='enter-doc-id' 
                        id = 'userInput' 
                        required 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <button onClick={handleSubmit}>Submit</button>

                </form>
                {props.content}
            </div>
        </div>

    )
}

export default Popup;
//export window.globalInput;
//export {input};
//export {handleSubmit};
