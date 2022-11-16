import { Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import AddTripButton from "./AddTripButton";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { readdb } from "../../firebase";
import GameList from "./GameList";
import {Spinner} from 'react-bootstrap';

export default function GamesBoard() {

  const [filtered, setFiltered] = useState([]);
  const { currentUser } = useAuth();
  
  
  useEffect(()=>{

    let aux;
    
    setFiltered([]);
    
    readdb.collection("trips").get()
    .then((querySnapshot) => 
    {
      querySnapshot.forEach((doc) => {
        filtered.push(doc.data());
      })
      aux=filtered.filter((object)=>
      object.trip.driver===currentUser._delegate.email);
      setFiltered(aux);
    })
    .catch((error) => console.log("Error getting documents: ", error));
  }, []);

  return (
    <>
     
    <Navbar/>
    <Container  fluid className="d-flex flex-column">
    <div className="d-flex align-items-center flex-column">
      <Container className="flex-column mb-4">
        <AddTripButton></AddTripButton>
      </Container>
      {!filtered.length ?
        <>
        <Container className="d-flex justify-content-center">
        <Spinner animation='grow' variant='danger'/>
        <Spinner animation='grow' variant='primary'/>
        <Spinner animation='grow' variant='light'/>
        </Container>
        </>
        : 


      <Container className="flex-column">
      <GameList nextGames={filtered} setNextgames={setFiltered}/>
      </Container>
}

    </div>
    
    </Container>
    
    </>
  )
}
