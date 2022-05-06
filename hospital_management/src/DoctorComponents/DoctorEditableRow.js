import React from "react";
import { p_id } from "../Doctor.js";
import { a_id } from "../Doctor.js";

const DoctorEditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    //console.log(p_id_arr);
    return (
        <tr>
            <td>{p_id}</td>
            <td>{a_id}</td>
            <td>
                <input type="text" required="required" placeholder="Enter feedback..." name = "appt_feedback" value={editFormData.appt_feedback} onChange={handleEditFormChange}></input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
};

export default DoctorEditableRow