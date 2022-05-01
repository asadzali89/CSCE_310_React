// Vivian Zheng
import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import './Equipment.css';
import EquipReadOnlyRow from './equipComponents/EquipReadOnlyRow';
import EquipEditableRow from './equipComponents/EquipEditableRow';

function Equipment(){
    // Data state variable defaulted to an empty array (for printing out the data)
    const [equipmentData, setEquipmentData] = useState([]);

    // Data state variable for the data from the add equipment form
    const [addFormData, setAddFormData] = useState({
        equip_id: '',
        equip_name: '',
        model: '',
        brand: '',
        price: '',
        total_in_stock: ''
    })

    // New form to update the equipment row
    const [editFormData, setEditFormData] = useState({
        equip_id: '',
        equip_name: '',
        model: '',
        brand: '',
        price: '',
        total_in_stock: '',
        checked_out: ''
    })

    // New form to delete the equipment row
    const [deleteFormData, setDeleteFormData] = useState({
        equip_id: '',
    })

    // Allows for edited equipment to be updated live
    const [editEquipmentID, setEditEquipmentID] = useState(null);

    // Allows for deleted equipment to be updated live
    const [deleteEquipmentID, setDeleteEquipmentID] = useState(null);

    // Handles when the user inputs new equipment values into the form
    const handleAddFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');
        
        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newFormData = {... addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    // Handles when the user edits/updates a piece of equipment
    const handleEditFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');

        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newFormData = {... editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    // Actions to take when the user hits submit
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new equipment instance
        const newEquipment = {
            equip_id: addFormData.equip_id,
            equip_name: addFormData.equip_name,
            model: addFormData.model,
            brand: addFormData.brand,
            price: addFormData.price,
            total_in_stock: addFormData.total_in_stock

        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newEquipment)          // body = info for the piece of equipment to add (from newEquipment instance)
        }

        // Add the new equipment into the database/the table
        fetch('http://localhost:3001/equipment', requestOptions)
            .then(res => res.json())
            .then(json => setEquipmentData(json))
            .then(window.location.reload('false'));             //Reload the page with the new equipment added to the table
    }

    // Handles when a user hits save for their edits of equipment
    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new equipment instance
        const editedEquipment = {
            equip_id: editFormData.equip_id,
            equip_name: editFormData.equip_name,
            model: editFormData.model,
            brand: editFormData.brand,
            price: editFormData.price,
            total_in_stock: editFormData.total_in_stock,
            checked_out: editFormData.checked_out
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedEquipment)          // body = info for the piece of equipment to add (from editedEquipment instance)
        }

        // Add the new equipment into the database/the table
        fetch('http://localhost:3001/equipment/update', requestOptions)
            .then(res => res.json())
            .then(json => setEditEquipmentID(json))
            .then(window.location.reload('false'));             //Reload the page with the updated equipment added to the table
    }

    // Handles when a user hits delete
    const handleDeleteSubmit = (event) => {
        event.preventDefault();
        const deletedEquipment = {
            equip_id: deleteFormData.equip_id,
        }

        const requestOptions = {
            method: 'DELETE',             // Delete = delete  request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(deletedEquipment)          // body = info for the piece of equipment to add (from newEquipment instance)
        }

        // Delete the equipment into the database/the table
        fetch('http://localhost:3001/equipment/delete', requestOptions)
            .then(res => res.json())
            .then(json => setDeleteEquipmentID(json))
            .then(window.location.reload('false'));             //Reload the page with the new equipment deleted from the table

    }

    // Takes in equipment as a parameter so that we can save the specific row id for that piece of equipment
    const handleEditClick = (event, equipment) => {
        event.preventDefault();
        setEditEquipmentID(equipment.equip_id);

        const formValues = {
            equip_id: equipment.equip_id,
            equip_name: equipment.equip_name,
            model: equipment.model,
            brand: equipment.brand,
            price: equipment.price,
            total_in_stock: equipment.total_in_stock,
            checked_out : equipment.checked_out
        }

        setEditFormData(formValues);
    }

    // Delete an equipment row from the database
    const handleDeleteClick = (event, equip_id) => {
        event.preventDefault();

        const requestOptions = {
            method: 'DELETE',             // Delete = delete  request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"equip_id" : equip_id})          // body = info for the piece of equipment to add (from newEquipment instance)
        }

        // Delete the equipment into the database/the table
        fetch('http://localhost:3001/equipment/delete', requestOptions)
            .then(res => res.json())
            .then(json => setDeleteEquipmentID(json))
            .then(window.location.reload('false'));             //Reload the page with the new equipment deleted from the table


    }

    // Print out the contents of the table
    // GET request function from the equipment page
    // Actual GET request in dbConnEquipment.js (has the SQL query)
    const fetchEquipment = () => {
        fetch('http://localhost:3001/equipment')
            .then(res => res.json())
            .then(json => setEquipmentData(json));
    }

    // Call the function on the component mount
    useEffect(() => {
        fetchEquipment();
    }, []);

    return(
        <div className = "equipmentTitle">
            <h1>
                Equipment
            </h1>

            <div className = "searchBar">
                <input type="text" placeholder="Search equipment..."></input>
            </div>

            <div className = "equipTable">
                <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th> 
                            <th>Model</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Total In Stock</th>
                            <th>Number Checked Out</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { equipmentData.map((equipment) => (
                            <Fragment>
                                {/* If id in current equipment matches the id in the editEquipmentID state, then render the editable row */}
                                {/* Else render the read only row */}
                                {editEquipmentID === equipment.equip_id ? (
                                    <EquipEditableRow 
                                        equipment={equipment} 
                                        editFormData={editFormData} 
                                        handleEditFormChange={handleEditFormChange} 
                                    />
                                ) : (           
                                    <EquipReadOnlyRow equipment={equipment} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
                                )}   
                            </Fragment>      
                        ))}
                        
                    </tbody>
                </table>
                </form>

                {/* NEW FORM/TABLE FOR INSERTING NEW EQUIPMENT */}            
                <h2>Add New Equipment</h2>
                <form onSubmit = {handleAddFormSubmit}>
                        {/* NOTE: that all of the inputs are required (form cannot be submit if something isn't filled out) */}
                        <input 
                            type="number"
                            name="equip_id" 
                            required="required"
                            placeholder="Enter ID..."
                            onChange={handleAddFormChange}
                        />
                        <input 
                            type="text"
                            name="equip_name" 
                            required="required"
                            placeholder="Enter name..."
                            onChange={handleAddFormChange}
                        />
                        <input 
                            type="text"
                            name="model" 
                            required="required"
                            placeholder="Enter model..."
                            onChange={handleAddFormChange}
                        />
                        <input 
                            type="text"
                            name="brand" 
                            required="required"
                            placeholder="Enter brand..."
                            onChange={handleAddFormChange}
                        />
                        <input 
                            type="number"
                            name="price" 
                            required="required"
                            placeholder="Enter price..."
                            onChange={handleAddFormChange}
                        />
                        <input 
                            type="number"
                            name="total_in_stock" 
                            required="required"
                            placeholder="Enter number in stock..."
                            onChange={handleAddFormChange}
                        />
                        <button type="submit">Add Equipment</button>
                </form>

            </div>
        


        </div>
    );
        
}

export default Equipment;

