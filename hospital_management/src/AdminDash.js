import React from "react";
import { HashRouter as Routes, Route, NavLink } from "react-router-dom";

import './Appointment.css'

function AdminDash() {
    return (
      <div>
        <div className="profile-body">
          <h1 className="profile-header">Admin Overview</h1>
          <table className="crud-table">
            <tbody>
                <tr>
                  <td><NavLink to="/Doctor">Doctors</NavLink></td>
                  <td>View/add/update/delete all Doctors</td>
                </tr>
                <tr>
                  <td><NavLink to="/Equipment">Equipment</NavLink></td>
                  <td>View/add/update/delete all Equipment</td>
                </tr>
                <tr>
                  <td><NavLink to="/Patients">Patients</NavLink></td>
                  <td>View all patients</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default AdminDash;
