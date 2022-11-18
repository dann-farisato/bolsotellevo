import { Button, Modal, Form } from 'react-bootstrap';
import { writedb } from '../../firebase';
import React, { useState } from 'react';
import moment from 'moment';
import { useAuth } from "../../contexts/AuthContext";
import PanningComponent from './PanningComponent';

export default function AddTripButton() {

  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trip = {
      driver: String(currentUser._delegate.email),
      available_places: String(e.currentTarget.available_places.value),
      origin: String(e.currentTarget.origin.value),
      destin: String(e.currentTarget.destin.value),
      date: String(e.currentTarget.date.value),
      passengers: [],
      passengers_requests: [],
    }
    console.log(trip)

    writedb.trips.add({ trip })
      .then((eventFromDB) => {
        const resetForm = e.target as HTMLFormElement;
        resetForm.reset();
      })
      .catch((error) => console.log(error));
  }

  let today = moment(Date.now()).format('YYYY-MM-DDThh:mm');

  return (
    <>
      <Button className="mt-4" onClick={openModal} variant="outline-primary " size="sm"
      >
        post a trip
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Driver</Form.Label>
              <Form.Control
                type="text"
                name="driver"
                placeholder={currentUser ? currentUser._delegate.email : ""}
                disabled
              />
              <Form.Label>Passengers</Form.Label>
              <Form.Control
                type="number"
                required
                name="available_places"
              />
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                required
                name="origin"
                className="mb-2"
              />
              <div className="square border rounded">
                <PanningComponent />
              </div>
              <Form.Label>Destination</Form.Label>
              <Form.Select name="destin">
                <option>Open this select menu</option>
                <option value="Cerrito">Cerrito</option>
                <option value="Rampla">Rampla</option>
              </Form.Select>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                min={today}
                required
                name="date"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Trip
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}