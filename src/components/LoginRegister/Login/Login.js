import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";

const Login = () => {
  const { error, useUserSignIn } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: userLogin } = useUserSignIn(location, navigate);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    userLogin({ email, password });
  };

  return (
    <div>
      <Container className="w-25 mx-auto shadow p-4 rounded mt-5">
        <Form onSubmit={handleLogin}>
          <h2 className="text-center fw-bold">Login</h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Link to="/register">New User?</Link>
          <br />
          <Button className="mt-2 w-100" variant="dark" type="submit">
            Submit
          </Button>
        </Form>
        <p>{error ? error : ""}</p>
      </Container>
    </div>
  );
};

export default Login;
