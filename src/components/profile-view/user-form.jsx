import React from 'react'
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { PersonSquare } from 'react-bootstrap-icons';
import "./profile-view.scss";

export default function UserForm({ 
  user, 
  handleUpdate, 
  handleDelete, 
  username, 
  setUsername, 
  password,
  setPassword,
  email, 
  setEmail, 
  birthday, 
  setBirthday 
}) {
  return (
    <Card>
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
            <Card>
                <Card.Body>
                    <Card.Title>My Profile</Card.Title>
                    <PersonSquare variant="top" color="var(--secondary-color)" className="my-4" size={180} />
                    <Card.Text className='CardText'><span>Name:</span> {user.Username}</Card.Text>
                    <Card.Text className='CardText'><span>Email:</span> {user.Email}</Card.Text>
                    <Card.Text className='CardText'><span>Birthday:</span> {user.BirthDay ? new Date(user.BirthDay).toISOString().split('T')[0] : 'No birthday set'}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col md={7} className="mt-5">
            <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                    className="mb-3"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="5"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                    className="mb-3"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="date"
                      value={birthday}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setBirthday(e.target.value);
                      }}
                    />
                  </Form.Group>
                <Button type="submit" onClick={handleUpdate} className="mt-3 me-2">Update</Button>
                <Button onClick={handleDelete} className="mt-3 bg-danger border-danger text-white">Delete User</Button>
            </Form>
        </Col>
      </Row>   

    </Card>

  )
}