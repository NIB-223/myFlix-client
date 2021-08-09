import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Date of Birth:
        <input type="date" value={birthdate} onChange={e => setBirthDate(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}
RegistrationView.propTypes = {
  SignUp: PropTypes.func.isRequired
};


