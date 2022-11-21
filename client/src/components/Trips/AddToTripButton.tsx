import { Button, Modal, Form, Container } from 'react-bootstrap';
import { writedb, readdb } from '../../firebase';
import React, { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from 'react';
import { DocAndIdType, TripType } from '../../Type';

export default function AddToTripButton({ trip }: { trip: TripType }, { setTrips }: { setTrips: React.Dispatch<React.SetStateAction<TripType[]>> }) {

  const [open, setOpen] = useState(false);
  const [docId, setDocId] = useState<DocAndIdType[]>([]);
  const { currentUser } = useAuth();

  const driver = trip.driver;

  useEffect(() => {
    readdb.collection("trips").where("trip", "!=", "").get()
      .then((querySnapshot) => {

        querySnapshot.forEach((ele) => {
          const docAndId = {
            driver: ele.data().trip.driver,
            id: ele.id
          }
          setDocId(prevState => [...prevState, docAndId]);
        })

        setDocId(docId.filter((object) => object.driver === driver as unknown as number));

      })
      .catch((error) => console.log("Error getting documents: ", error));
  }, []);

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function submitHandler(e: { preventDefault: () => void }) {
    e.preventDefault();
    (trip.passengers_requests).push(currentUser.email);
    const docRef = readdb.collection('trips').doc(docId[0].id);
    docRef.update(
      trip
    ).then(() => {
      console.log("Document successfully updated!");
    })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    setTrips((prevTrips) => [...prevTrips])

  }

  return (
    <>
      <Button className="mt-4" onClick={openModal} variant="outline-primary mb-2" size="sm"
      >
        Join {trip.driver}
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <h2>Trip Details:</h2>
            <p>Destin: {String(trip.destin)}</p>
            <p>Driver: {String(trip.driver)}</p>
            <p>Available spots: {String(trip.available_places)}</p>
            <p>Date: {String(trip.date)}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Ask {trip.driver} to join
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
