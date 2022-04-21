import React from "react";
import './App.css';
import Nav from './Nav';
import Equipment from './Equipment';
import Home from './Home';
import Appointment from './Appointment';
import Login from './Login';
import Paystub from './Paystub';
import Register from './Register'
import AdminLogin from './AdminLogin'
import Doctor from './Doctor'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Equipment" element={<Equipment />} />
            <Route exact path="/Appointment" element={<Appointment />} />
            <Route exact path="/Paystub" element={<Paystub />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="Admin-login" element={<AdminLogin />} />
            <Route exact path="/Doctor" element={<Doctor />} />
          </Routes>
        </div>
      </Router>
    );
  }

export default App;
