import { Container } from "react-bootstrap";
import AddTripButton from "../AddTripButton";
import Navbar from "../Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../../firebase";
import GameList from '../GameList';
import { Spinner } from 'react-bootstrap';
import { GameType } from "../../../Type";
import './dashboard.component.css'


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

      <Container className="container h-100 text-white" >
        <div className="row d-flex align-items-center h-100">
          <Container className="col-md-6">
            <h1 className="mb-4 opacity-90" >Post a Trip</h1>
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



      {/* my css */}


      <div className="container h-100 text-white">
        <div className="row d-flex align-items-center h-100">
          <div className="col-md-6">
            <h1 className="mb-4 opacity-90" >Post a Trip</h1>
            <h5 className="mb-4 opacity-80" >Choose the lift</h5>
            <p className="mb-4 opacity-70 align-content-around">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente illum distinctio fugit
              consectetur quae deleniti corrupti provident vel porro, dolore molestias nihil iusto quidem
              dolorem at amet voluptates esse pariatur.</p>
            <a href="#" className="btn btn-light btn-lg me-3 opacity-80 ripple" role="button">Post a Trip</a>
            <a href="#" className="btn btn-outline-light btn-lg me-3 opacity-80">Check All Trips</a>
          </div>
          <div className="col-md-5 offset-md-1 position-relative">
            <div id="shape-1" className="position-absolute strong-5-strong"></div>
            <div id="shape-2" className="position-absolute strong-5-strong"></div>
            <div id="card-custom" className="card shadow-6 rounded-6">
              <div className="card-body p-5">
                <h2>
                  <strong className="fw-bolder">View</strong>
                  <span className="fw-lighter">next trip</span>
                </h2>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
