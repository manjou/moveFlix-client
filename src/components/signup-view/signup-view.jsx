import "./signup-view.scss";

import {useState} from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

const cardStyle = {
  backgroundColor: 'var(--primary-color)'
};

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      BirthDay: birthday
    };


    fetch("https://myflix-api-qeb7.onrender.com/users/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed: ");
      }
    });
  };

  return (
    <Container>
      <Row> 
        <Col>
          <CardGroup>
            <Card style={cardStyle}>
              <Card.Body>
              <Card.Title id="Signup-Card-Title" className="mb-3">Please Register</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="signUpFormUsername" className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                    placeholder="Enter a username"
                  />
                </Form.Group>
                <Form.Group controlId="signUpFormPassword" className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    minLength="8"
                    placeholder="Your password must be 8 or more characters"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="signUpFormEmail" className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Enter your Email adress"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="signUpFormBirthDay" className="mb-3">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)} 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="Custom-Button">
                  Sign Up
                </Button>
              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
 
  );
};