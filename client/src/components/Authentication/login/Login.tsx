import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './login.component.css';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailRef.current || !userNameRef.current || !passwordRef.current) {
      return;
    }

    try {
      setError('');
      setLoading(true);
      console.log(emailRef.current.value)
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (

    <>
      <div className="d-flex justify-content-center">
        <div className="row d-flex align-items-center h-100 position-absolute">
          <div className="col-md-5 offset-md-1 position-relative align-items-md-center">
            <div id="shape-1" className="position-absolute strong-5-strong"></div>
            <div id="shape-2" className="position-absolute strong-5-strong"></div>
            <div id="card-custom-login" className="card-group shadow-6 ">
              <div className="card-body p-5 opacity-90 align-items-center">
                <h2>
                  <strong className="fw-bolder text-white">Login</strong>
                  <img src={require("../../../logos/86home.jpg")} className="card-img-top" alt="..."></img>
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="d-flex flex-column w-80" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="form-floating mb-3 ">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className="action-email" type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control className="action-user" type="username" ref={userNameRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="action-password" type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="my-btn w-100 mt-4" type="submit">
                    Log In
                  </Button>
                </Form>
              </div>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

            </div>
          </div>
        </div>
        <div className="w-100 text-center mt-2 text-white">
          Create an account?<Link to="/signup">Sign Up</Link>
        </div>

      </div>
    </>
  )
}