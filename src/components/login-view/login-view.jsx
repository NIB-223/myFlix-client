import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import logo from '../../../img/logo.jpg';
import './login-view.scss'



export function LoginView(props) { 
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflixdb20.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      alert('Incorrect username or password.')
    });
  };


  return (
    <>
    
    <h1 className="login-title" >Login</h1>
    <Form>
    <Form.Group className="mb-3 pt-5"  controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control size="lg"  type="text" onChange={e => setUsername(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control size="lg" type="password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    
    <div className="register">
    <Button className="login-button" variant="primary" type="submit" onClick={handleSubmit}>
      Login
    </Button>
          <p className="register">Don't have an account?  <a  href="/register">Register Now</a></p>
    </div>

  </Form>
  </>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};