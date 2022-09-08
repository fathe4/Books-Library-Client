import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";

const Register = () => {
  const { RegisterUser, error } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    RegisterUser(email, password, name, location, navigate);
  };

  return (
    <div>
      <Container className="w-25 mx-auto shadow p-4 rounded mt-5">
        <Form onSubmit={handleRegister}>
          <h2 className="text-center fw-bold">Register</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Your Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Link to="/login">Already Registered?</Link>
          <br />
          {error ? <p>{error}</p> : ""}
          <br />
          <Button className="mt-2 w-100" variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
