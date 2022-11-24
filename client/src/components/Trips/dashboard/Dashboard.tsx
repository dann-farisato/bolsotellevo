import AddTripButton from "../addTripButton/AddTripButton";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../../firebase";
import GameList from '../gameList/GameList';
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

      <div className="container text-white">
        <div className="row d-flex align-items-center h-100">
          <div className="col-md-6">
            <h1 className="mb-4 opacity-90" >Check your trips and lifts</h1>
            <h5 className="mb-4 opacity-80">Choose the game</h5>
            <p className="mb-4 opacity-70 align-content-around">Did you know that a commuter will typically save over £1,000 a year? Find someone to share your journey with to begin saving money.

              Car sharing is a great way of alleviating the stress caused by travel and reducing road and parking congestion.

              Start sharing now!</p>
            <AddTripButton></AddTripButton>
          </div>
          <div className="col-md-5 offset-md-1 position-relative justify-content-center">
            <div id="shape-1" className="position-absolute strong-5-strong"></div>
            <div id="shape-2" className="position-absolute strong-5-strong"></div>
            <div id="card-custom-dash" className="card-group shadow-6 rounded-6">
              <div className="d-flex flex-column card-body p-5 opacity-90 align-items-center w-100">
                <h2>
                  <strong className="fw-bolder">View </strong>
                  <span className="fw-lighter">next trip</span>

                  <img src={require("../../../logos/86home.jpg")} className="card-img-top" alt=""></img>
                </h2>


                {!nextGames.length ?
                  <>
                    <Spinner animation='grow' variant='danger' />
                    <Spinner animation='grow' variant='primary' />
                    <Spinner animation='grow' variant='light' />
                  </>
                  :
                  <GameList nextGames={nextGames} />
                }
                {/* <p className="card-text mb-2 badge bg-primary">Joe Doe - Premium user</p>
                  <p className="mb-5 badge bg-light text-dark">Date: 12/12/22</p>
                  <h6 className="card-text mb-2 badge bg-success">Match: Barça x Real Madrid</h6> */}

              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
