import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export function LoginView(props) { 
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username); //this is a prop
  };

  return (
    <Form>
    <Form.Group className="mb-3 pt-5"  controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control size="lg"  type="text" onChange={e => setUsername(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control size="lg" type="password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Submit
    </Button>
  </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};