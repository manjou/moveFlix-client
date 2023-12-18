import "./login-view.scss";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to relaod the entire page
    event.preventDefault();

      const data = {
        Username: username,
        Password: password
      };

      fetch("https://myflix-api-qeb7.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // console.log("Login response: ", data);
          if (Object.keys(data.user).length > 0) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("No such user");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card id="Login-Card">
              <Card.Body>
                <Card.Title id="Login-Title" className="mb-3">Please Login</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className="mb-3">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        aria-required
                        minLength="3"
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="Custom-Button">
                      Login
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