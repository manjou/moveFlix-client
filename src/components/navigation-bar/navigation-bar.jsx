import React from 'react';
import { Navbar, Container, Nav, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../../img/moveflix-logo.svg';

export const NavigationBar = ({ 
  user, 
  onLoggedOut, 
  search, 
  setSearch, 
  selectedGenre, 
  setSelectedGenre 
}) => {
  return (
    <Navbar 
    bg="dark" 
    data-bs-theme="dark" 
    expand="lg" 
    className='sticky-top mb-4 me-auto d-flex justify-content-between'
    >
      <div className="d-flex justify-content-between w-100">
            <Navbar.Brand as={Link} to="/" className="ms-3">
              <img
                src={Logo}
                alt="MoveFlix Logo"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>

          {user && (
                <Form className="d-flex justify-content-center">
                  <Form.Select
                    className="me-3 w-50" 
                    aria-label="Default select genre"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                  >
                      <option value="">Genre</option>
                      <option value="Animation">Animation</option>
                      <option value="Romance">Romance</option>
                      <option value="War Drama">War Drama</option>
                      <option value="Revisionist Western">Revisionist Western</option>
                      <option value="Comedy-Drama">Comedy-Drama</option>
                      <option value="Psychological Horror">Psychological Horror</option>
                      <option value="Dystopian Crime">Dystopian Crime</option>
                      <option value="Historical Drama">Historical Drama</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Drama">Drama</option>
                      <option value="Action">Action</option>
                      <option value="Science Fantasy">Science Fantasy</option>
                  </Form.Select>
                </Form>
              )}

            {user && (
                <Form className="movieSearch">
                  <Form.Control
                    className="me-3 w-50"
                    type="search"
                    id="searchForm"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for ..."
                    aria-label="Search"
                  />  
                </Form>
            )}

            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: '15px' }} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
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
                      Movies
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                      Profile
                    </Nav.Link>
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
        </div>
    </Navbar>
  );
};
