import { Container } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import AddTripButton from "../addTripButton/AddTripButton";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../../firebase";
import TripList from "../tripList/TripList";
import { Spinner } from 'react-bootstrap';
import CenteredContainer from '../../Authentication/centered-container/CenteredContainer'
import { DocumentData } from '@firebase/firestore-types'
import { TripsFromFB, TripType } from "../../../Type";

// export interface TripType {
//   passengers: any,
//   trip: string,
//   destin: string,
//   date: any,
//   passengers_requests: string[],
//   driver: string,
//   available_places: number
// }
export default function Requests() {

  const [yourTrips, setYourtrips] = useState<TripsFromFB[]>({} as TripsFromFB[]);

  useEffect(() => {

    readdb.collection("trips").get()
      .then((querySnapshot) => {
        let trips: any;
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        })
        setYourtrips(trips);
      })
      .catch((error) => console.log("Error getting documents: ", error));
  }, []);

  return (
    <>
      <Navbar />
      <Container fluid className="d-flex flex-column">
        <div className="d-flex align-items-center flex-column">
          <Container className="flex-column mb-4">
            <AddTripButton></AddTripButton>
          </Container>

          <Container className="flex-column">
            {!yourTrips.length ?
              <>
                <Container>
                  <Spinner animation='grow' variant='danger' />
                  <Spinner animation='grow' variant='primary' />
                  <Spinner animation='grow' variant='light' />
                </Container>
              </>
              :
              <TripList trips={yourTrips} setTrips={setYourtrips} />
            }
          </Container>


        </div>

      </Container>

    </>
  )
}
