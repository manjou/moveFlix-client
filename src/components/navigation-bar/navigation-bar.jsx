import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../../img/moveflix-logo.svg';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className='sticky-top mb-5'>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            alt="MoveFlix Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="justify-content-md-start">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
