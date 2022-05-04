import React from "react";
import { p_id } from "../Doctor.js";
import { btn_type } from "./DoctorReadOnlyRow.js";

const DoctorEditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    //console.log(p_id_arr);
    return (
        <tr>
            <td>{p_id}</td>
            <td>
            {btn_type === "edit" ? (
                <input type="text" required="required" name = "appt_feedback" placeholder="Enter feedback..." value={editFormData.appt_feedback} onChange={handleEditFormChange}></input>
            ) : (
                <input type="text" required="required" name = "appt_feedback" placeholder="Enter new feedback..."  onChange={handleEditFormChange}></input>
            )}
                
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
};

export default DoctorEditableRow