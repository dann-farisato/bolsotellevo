import { Container } from "react-bootstrap";
import AddTripButton from "../addTripButton/AddTripButton";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../../firebase";
import TripList from "../tripList/TripList";
import { useParams } from "react-router-dom";
import { DocumentData } from '@firebase/firestore-types'
import { GameType, TripType, TripsFromFB } from "../../../Type";

export default function TripsBoard() {

  const [trips, setTrips] = useState<TripsFromFB[]>([]);

  const currentGame = useParams().gameId;

  useEffect(() => {

    readdb.collection("trips").where("trip", "!=", "").get()
      .then((querySnapshot) => {
        console.log('trips : ', querySnapshot)
        let trips: DocumentData = [];
        querySnapshot.docs.forEach((doc) => {
          trips.push(doc.data() as TripsFromFB);
        })
        console.log(trips)
        setTrips(trips.filter((element: TripsFromFB) => element.trip.destin === currentGame));
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
