import { Container } from "react-bootstrap";
import AddTripButton from "./AddTripButton";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../firebase";
import GameList from './GameList';
import { Spinner } from 'react-bootstrap';
import { GameType } from "../../Type";


export default function Dashboard() {


  const [nextGames, setNextgames] = useState<GameType[]>([]);

  useEffect(() => {

    readdb.collection("games").get()
      .then((querySnapshot) => {
        let games: never[] = [];
        querySnapshot.forEach((doc) => {
          games.push(doc.data() as never)
        })
        setNextgames(games);
      })
      .catch((error) => console.log("Error getting documents: ", error));
  }, []);
  console.log('from dashboard comp', nextGames);
  return (
    <>
      <Navbar />
      <Container fluid className="d-flex flex-column">
        <div className="d-flex align-items-center flex-column">
          <Container className="flex-column mb-4">
            <AddTripButton></AddTripButton>
          </Container>

          <Container>
            <h2 className="text-primary">Upcoming games:</h2>
          </Container>
          <Container className="d-flex flex-column justify-content-center">
            {!nextGames.length ?
              <>
                <Container className="d-flex justify-content-center">
                  <Spinner animation='grow' variant='danger' />
                  <Spinner animation='grow' variant='primary' />
                  <Spinner animation='grow' variant='light' />
                </Container>
              </>
              :
              <GameList nextGames={nextGames} />
            }
          </Container>


        </div>

      </Container>

    </>
  )
}
