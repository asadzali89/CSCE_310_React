import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegistrationForm extends Component {
  constructor() {
    super();

    this.state = {
      fname: "",
      lname: "",
      dob: "",
      gender: "",
      street_addr: "",
      state: "",
      zip_code: 0,
      email: "",
      phone_number: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // console.log("The form was submitted with the following data:");
    // console.log(this.state);

    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    };
    
    fetch('http://localhost:3001/patients', requestOptions)
    .then(console.log("New Patient added"))
  }

  render() {
    return (
      <div className="formCenter">
        <form onSubmit={this.handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="fname">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              className="formFieldInput"
              placeholder="Enter your first name"
              name="fname"
              value={this.state.fname}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="lname">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              className="formFieldInput"
              placeholder="Enter your last name"
              name="lname"
              value={this.state.lname}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="formFieldInput"
              name="dob"
              value={this.state.dob}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="gender">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              className="formFieldInput"
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="street_addr">
              Street Address
            </label>
            <input
              type="text"
              id="street_addr"
              className="formFieldInput"
              placeholder="Type Street Address"
              name="street_addr"
              value={this.state.street_addr}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              className="formFieldInput"
              placeholder="Type State of Residence"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="zip_code">
              Zip Code
            </label>
            <input
              type="number"
              min="0"
              max="99999"
              id="zip_code"
              className="formFieldInput"
              placeholder="77840"
              name="zip_code"
              value={parseInt(this.state.zip_code)}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              className="formFieldInput"
              placeholder="979-123-4567"
              name="phone_number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={this.state.phone_number}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/Login" className="formFieldLink">
              I'm already a member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default RegistrationForm;
