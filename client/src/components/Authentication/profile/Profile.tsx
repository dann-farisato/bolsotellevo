import { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from '../centered-container/CenteredContainer';
import './profile.component.css'

export default function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/');
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <CenteredContainer>

      <Card id="card-custom-profile">
        <Card.Body >
          <h2 className="text-center text-white mb-4">Profile</h2>
          <img src={require("../../../logos/86home.jpg")} className="card-img-top" alt=""></img>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong className="text-white">Email:</strong>
          <div className="text-white">
            {currentUser.email}

          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </CenteredContainer>
  )
}