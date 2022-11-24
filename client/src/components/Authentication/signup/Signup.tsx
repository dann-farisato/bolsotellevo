import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from '../centered-container/CenteredContainer';
import './signup.component.css'

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!passwordRef.current || !passwordConfirmRef.current) {
      return;
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
      return
    }


    try {
      setError('');
      setLoading(true);
      if (!emailRef.current || !userNameRef.current) {
        return;
      }
      console.log(emailRef.current.value, passwordRef.current.value)
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card id="card-custom-signup">
        <Card.Body>
          <h2 className="text-center text-white mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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
            <Form.Group className="mb-4" id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </CenteredContainer>
  )
}