import { Container, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import AddToTripButton from "./AddToTripButton";
import { useAuth } from "../../contexts/AuthContext";
import {Button} from "react-bootstrap";
import { readdb } from "../../firebase";
import { useState, useEffect } from "react";

export default function Trip({trip, setTrips}) {
  
  const { currentUser } = useAuth();
  const [docId, setDocId] = useState([]);
  let passengers_requests=trip.trip.passengers_requests;
  const driver=trip.trip.driver;

  useEffect(()=>{
    readdb.collection("trips").where("trip", "!=", "").get()
    .then((querySnapshot) => 
    { 

      querySnapshot.forEach((ele) => {
        const docAndId= {
          driver: ele.data().trip.driver,
          id: ele.id
        }
        setDocId(docId.push(docAndId)); 
      })

      setDocId(docId.filter((object)=>object.driver===driver));
      
    })
    .catch((error) => console.log("Error getting documents: ", error));
  },[]);

  function tripHandler() {
    console.log('adding to a trip'); 
  }

  function handleAccept (e) {
    const newPassenger=e.target.value;

    console.log('newpass', newPassenger);
    console.log('before', passengers_requests);
    passengers_requests.splice(passengers_requests.findIndex(()=>newPassenger),1);
    console.log('after', trip.trip.passengers_requests);
    trip.trip.passengers.push(newPassenger);
    console.log(docId[0].id)
    
    const docRef = readdb.collection('trips').doc(docId[0].id);

    trip={trip: trip.trip}

    docRef.update(
      trip
    ).then(()=>{
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

    setTrips((prevTrips)=>[...prevTrips])
  
  }

  function handleDenny () {

  }

  return (
    <>
    
    <Card onClick={tripHandler} className="d-flex align-items-center flex-column mb-2">

    <Container>
      <p>{String(trip.trip.destin)}</p> 
      <p>{String(trip.trip.driver)}</p> 
      <p>{String(trip.trip.available_places)}</p> 
    </Container>
    { currentUser._delegate.email===trip.trip.driver?
      <>
      <p>Your requests:</p>
            {(trip.trip.passengers_requests).map((element, key) => {
              return (
              <Container key={key} className="d-flex justify-content-end">
              {element}
                <Button
                  key={key}
                  variant="primary"
                  value={element}
                  onClick={handleAccept}
                  className="mb-2 me-2 ms-2"
                  >
                    Accept?
                    </Button>
                <Button
                className="mb-2 me-2"
                key={key+100}
                variant="danger"
                onClick={handleDenny}
                >

                Denny?
                </Button>
                </Container>
              
              )
            }
            )}
          </>
      :
      <>
      <AddToTripButton trip={trip} setTrips={setTrips}/>
      </>
    }
    </Card>
    </>
  )
}