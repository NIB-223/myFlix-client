import React from 'react';


import { NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './navbar-view.scss';
import logo from '../../../img/logo.jpg';

export class NavBar extends React.Component {

  // Log out function
 onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
  this.setState({
    user: null,
    token: null,
  });
}

render () {
  const { users } = this.props;

  return (

    <Navbar className="navigation-main" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/"><img className="myFlix-logo-nav" width={100} src={logo} alt="myFlix Logo" /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="menu-items">
    <NavDropdown title={`Hi ${this.props.user}`} id="collasible-nav-dropdown">
        <NavDropdown.Item as={Link} to="/">Movies</NavDropdown.Item>
        <NavDropdown.Item as={Link} to={`/users/${this.props.user}`}>Account</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button></NavDropdown.Item>
      </NavDropdown>
  </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
      );
    }
}