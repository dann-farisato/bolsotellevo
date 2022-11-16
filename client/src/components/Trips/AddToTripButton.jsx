import { Button, Modal, Form, Container } from 'react-bootstrap';
import { writedb, readdb } from '../../firebase';
import { useState } from 'react';
import moment from 'moment'; 
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AddToTripButton({trip, setTrips}) {
  
  const [open, setOpen] = useState(false);
  const [docId, setDocId] = useState([]);
  const { currentUser } = useAuth();
  
  const driver=trip.trip.driver;

  useEffect(()=>{
    readdb.collection("trips").where("trip", "!=", "").get()
    .then((querySnapshot) => 
    { 

      querySnapshot.forEach((ele) => {
        const docAndId= {
          driver: ele.data().trip.driver,
          id: ele.id
        }
        setDocId(docId.push(docAndId)); 
      })

      setDocId(docId.filter((object)=>object.driver===driver));
      
    })
    .catch((error) => console.log("Error getting documents: ", error));
  },[]);

  function openModal() {
    setOpen(true); 
  }
  function closeModal() {
    setOpen(false);
  }

  function submitHandler(e) {
    e.preventDefault();

    // trip.trip.available_places=String(Number(trip.trip.available_places)-1);
    console.log(trip.trip);
    (trip.trip.passengers_requests).push(currentUser.email);

    const docRef = readdb.collection('trips').doc(docId[0].id);

    trip={trip: trip.trip}

    docRef.update(
      trip
    ).then(()=>{
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

    setTrips((prevTrips)=>[...prevTrips])

     }

  return (
    <>
    <Button  className="mt-4" onClick={openModal} variant="outline-primary mb-2" size="sm" 
    >
      Join {trip.trip.driver}
    </Button>
    <Modal show={open} onHide={closeModal}>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
          <h2>Trip Details:</h2>
          <p>Destin: {String(trip.trip.destin)}</p> 
          <p>Driver: {String(trip.trip.driver)}</p> 
          <p>Available spots: {String(trip.trip.available_places)}</p>
          <p>Date: {String(trip.trip.date)}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Ask {trip.trip.driver} to join
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </>
  )
}
