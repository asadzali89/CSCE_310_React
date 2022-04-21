import React from 'react';
import './Equipment.css';

function Equipment(){
    return(
        <div className = "equipmentTitle">
            <h1>
                Equipment
            </h1>

            <div className = "searchBar">
                <input type="text" placeholder="Search equipment..."></input>
            </div>

            <div className = "checkInButton">
                <button type="button">Check In</button>
            </div>

            <div className = "checkOutButton">
            <button type="button">Check Out</button>
            </div>

            <div className = "updateButton">
            <button type="button">Update</button>
            </div>


            <div className = "equipTable">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th> 
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Total In Stock</th>
                        <th>Number Checked Out</th>
                    </tr>
                </table>
            </div>
        </div>

        
    );
}

export default Equipment;