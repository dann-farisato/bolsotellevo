import { Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import AddTripButton from "./AddTripButton";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../firebase";
import GameList from "./GameList";
import { Spinner } from 'react-bootstrap';
import { GameType, TripsFromFB } from "../../Type";

export default function GamesBoard() {

  const [filtered, setFiltered] = useState([]);
  const { currentUser } = useAuth();

  console.log('filtered + currentUser from game board comp: ', filtered, currentUser);

  useEffect(() => {

    // let aux;

    setFiltered([]);

    readdb.collection("trips").get()
      .then((querySnapshot) => {
        let aux: never[] = [];
        querySnapshot.forEach((doc) => {
          filtered.push(doc.data() as never);
        })
        aux = filtered.filter((object: TripsFromFB) => {
          console.log('filter object', object)
          return object.trip.driver === currentUser.email
        });
        setFiltered(aux);
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
          {!filtered.length ?
            <>
              <Container className="d-flex justify-content-center">
                <Spinner animation='grow' variant='danger' />
                <Spinner animation='grow' variant='primary' />
                <Spinner animation='grow' variant='light' />
              </Container>
            </>
            :


            <Container className="flex-column">
              <GameList nextGames={filtered} />
            </Container>
          }

        </div>

      </Container>

    </>
  )
}
