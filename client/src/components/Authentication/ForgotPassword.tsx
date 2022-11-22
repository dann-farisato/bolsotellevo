import { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Navbar } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';
import CenteredContainer from './centered-container/CenteredContainer';

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null)
  console.log('console from forgot password', emailRef)
  const auth = useAuth();
  let password: string | null = null;
  // if (auth) {
  //   const { resetPassword } = auth;
  //   password = resetPassword;
  // }
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!emailRef.current) {
      return;
    }

    try {
      setMessage("")
      setError("")
      setLoading(true)
      password && password
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <CenteredContainer>


        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </CenteredContainer>
    </>
  )
}