import React, { useState } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import logoCopy from '../../../img/logoCopy.jpg';

import './registration-view.scss'


export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
  
  

const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
      if (isValid) {
  axios.post('https://myflixdb20.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthDate
  })
  .then(response => {
    const data = response.data;
    console.log(data);
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab

  })
  .catch(e => {
    alert('Unable to register, please review credentials and try again.');
    console.log('error registering the user')
  });
}
}

const formValidation = () => {
  const usernameError = {};
  const passwordError = {};
  const emailError = {};
  let isValid = true;

  if (username.length < 4 || username === '') {
      usernameError.UsernameToShort = "Username must be more than 4 characters.";
      isValid = false;
  }
  if (password.length < 6 || password === '') {
      passwordError.noPassword = "You must enter a password at least 6 characters long.";
      isValid = false;
  }
  if (!email || email.indexOf('@') === -1) {
      emailError.notValidEmail = "Email is incorrect.";
      isValid = false;
  }

  setUsernameError(usernameError);
  setPasswordError(passwordError);
  setEmailError(emailError);
  return isValid;
};

return (
<>
<div style={{textAlign: 'center'}} >
    <img className="myFlix-logo" src={logoCopy} alt="myFlix Logo" />
</div>
  <h1 className="register-title">Register</h1>
<div className="form-flex">
<Form>
<Form.Group className="mb-3 pt-5" controlId="formUsername">
  <Form.Label>Username:</Form.Label>
  <Form.Control required size="lg" type="text" value={username} onChange={e => setUsername(e.target.value)} />
</Form.Group>
{Object.keys(usernameError).map((key) => {
          return (
            <div className="form-validation-error" key={key}>
              {usernameError[key]}
            </div>
          );
        })}

<Form.Group className="mb-3" controlId="formPassword">
  <Form.Label>Password:</Form.Label>
  <Form.Control required size="lg" type="password" value={password} onChange={e => setPassword(e.target.value)} />
</Form.Group>
{Object.keys(passwordError).map((key) => {
          return (
            <div className="form-validation-error" key={key}>
              {passwordError[key]}
            </div>
          );
        })}

<Form.Group className="mb-3" controlId="formPassword">
  <Form.Label>Email:</Form.Label>
  <Form.Control required size="lg"  type="email" value={email} onChange={e => setEmail(e.target.value)} />
</Form.Group>
{Object.keys(emailError).map((key) => {
          return (
            <div className="form-validation-error" key={key}>
              {emailError[key]}
            </div>
          );
        })}

<Form.Group className="mb-3" controlId="formPassword">
  <Form.Label>Date of Birth:</Form.Label>
  <Form.Control required size="lg" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
</Form.Group>
<div style={{textAlign: "center"}}>
  <Button className="register-btn" variant="primary" btn-type="submit" onClick={handleSubmit}>
      Register
  </Button>
</div>
</Form>
</div>

</>
);  

}

RegistrationView.propTypes = {
    register: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      BirthDate: PropTypes.date
    }),
    SignUp: PropTypes.func
};


