import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import logo from '../../../img/logo.jpg';

import './registration-view.scss'

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');


const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password, email, birthDate);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.SignUp(username); //this is a prop
  };


  return (
<>
<body>
<div className="logo-container">
  <img className="logo" src={logo}></img>
</div>

<h1>Register</h1>
<Form>
<Form.Group className="mb-3 pt-5" controlId="formUsername">
  <Form.Label>Username:</Form.Label>
  <Form.Control  size="lg" type="text" value={username} onChange={e => setUsername(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3" controlId="formPassword">
  <Form.Label>Password:</Form.Label>
  <Form.Control  size="lg" type="password" value={password} onChange={e => setPassword(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3" controlId="formPassword">
  <Form.Label>Email:</Form.Label>
  <Form.Control size="lg"  type="email" value={email} onChange={e => setEmail(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3" controlId="formPassword">
  <Form.Label>Date of Birth:</Form.Label>
  <Form.Control  size="lg" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
</Form.Group>

<Button variant="primary" btn- type="submit" onClick={handleSubmit}>
  Register
</Button>

</Form>
</body>
</>
  );

}

RegistrationView.propTypes = {
  SignUp: PropTypes.func.isRequired
};


