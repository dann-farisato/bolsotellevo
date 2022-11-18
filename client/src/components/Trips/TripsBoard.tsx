import { Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import AddTripButton from "./AddTripButton";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../firebase";
import TripList from "./TripList";
import { useParams } from "react-router-dom";
import { DocumentData } from '@firebase/firestore-types'

export default function TripsBoard() {

  const [trips, setTrips] = useState<DocumentData[]>([]);

  const currentGame = useParams().gameId;

  useEffect(() => {

    readdb.collection("trips").where("trip", "!=", "").get()
      .then((querySnapshot) => {
        let trips: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        })
        setTrips(trips.filter((element) => element.trip.destin === currentGame));
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

            <TripList trips={trips} setTrips={setTrips} />
          </Container>


        </div>

      </Container>

    </>
  )
}
