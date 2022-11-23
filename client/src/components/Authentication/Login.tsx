import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './centered-container/CenteredContainer';

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
    <div className='bg-light'>

      <CenteredContainer>
        <Card className="container h-100 text-white">
          <Card.Body>
            <div className="container h-100 text-white">
              <div className="row d-flex align-items-center h-100 position-absolute">
                <div className="col-md-5 offset-md-1 position-relative align-items-md-center">
                  <div id="shape-1" className="position-absolute strong-5-strong"></div>
                  <div id="shape-2" className="position-absolute strong-5-strong"></div>
                  <div id="card-custom" className="card-group shadow-6 ">
                    <div className="card-body p-5 opacity-90 align-items-center">
                      <h2 className="text-center mb-4 ">Log In</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                    </div>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                      </Form.Group>
                      <Form.Group id="username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="username" ref={userNameRef} required />
                      </Form.Group>
                      <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                      </Form.Group>
                      <Button disabled={loading} className="w-100 mt-4" type="submit">
                        Log In
                      </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Create an account? <Link to="/signup">Sign Up</Link>
        </div>
      </CenteredContainer>
    </div>
  )
}