import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { readdb } from '../../firebase';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

export default function NavbarComponent() {

  const [trips, setTrips] = useState<any[]>([]);

  const { currentUser } = useAuth();

  useEffect(() => {

    setTrips([]);
    readdb.collection("trips").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          trips.push(doc.data() as never);
        })
        setTrips(trips);
      })
      .catch((error) => console.log("Error getting documents: ", error));
  }, []);

  console.log('navbar state', currentUser)
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <div className="text-primary">
              <img src={require(`../../logos/Nacional.png`)} height={20} className='mb-2' />Bolsotellevo</div>
          </Navbar.Brand>
          <Nav>
            {
              !currentUser
                ?
                <Nav.Link as={Link} to="/login">
                  Login?
                </Nav.Link>
                :
                <Nav.Link as={Link} to="/user">
                  {!currentUser ? "" : currentUser._delegate ? currentUser._delegate.email : currentUser.email}
                </Nav.Link>
            }
          </Nav>
          <>
            {
              !currentUser ?
                ""
                :

                ((trips.filter((object) => object.trip.driver === currentUser.email).length)) ?
                  <Nav.Link as={Link} to="/user/next">
                    <>See your next games</>
                  </Nav.Link>
                  :
                  <></>
            }
            {
              !currentUser ?
                ""
                :
                ((trips.filter((object) => (object.trip.driver === currentUser.email) && (object.trip.passengers_requests.length > 0)).length)) ?
                  <Nav.Link as={Link} to="/user/requests">
                    <>You have {(trips.filter((object) => (object.trip.driver === currentUser.email) && (object.trip.passengers_requests.length > 0)).length)} new request{(trips.filter((object) => (object.trip.driver === currentUser._delegate.email) && (object.trip.passengers_requests.length > 0)).length) > 1 ? "s" : ""}</>
                  </Nav.Link>
                  :
                  <></>
            }

          </>

        </Container>
      </Navbar>
    </>
  )
}
