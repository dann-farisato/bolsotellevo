import { Container, Card } from "react-bootstrap"
import AddToTripButton from "./AddToTripButton";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { readdb } from "../../firebase";
import { useState, useEffect } from "react";
import { DocAndIdType, TripType } from "../../Type";


export default function Trip({ trip }: { trip: TripType }, { setTrips }: { setTrips: React.Dispatch<React.SetStateAction<TripType[]>> }) {

  const { currentUser } = useAuth();
  const [docId, setDocId] = useState<DocAndIdType[]>([]);
  let passengers_requests = trip.passengers_requests;
  const driver = trip.driver;

  useEffect(() => {
    readdb.collection("trips").where("trip", "!=", "").get()
      .then((querySnapshot) => {

        querySnapshot.forEach((ele) => {
          const docAndId: DocAndIdType | undefined = {
            driver: ele.data().trip.driver,
            id: ele.id
          }
          setDocId(prevStat => [...prevStat, docAndId])
        })

        setDocId(docId.filter((object) => object.driver === driver as unknown as number));

      })
      .catch((error) => console.log("Error getting documents: ", error));
  }, []);

  function tripHandler() {
    console.log('adding to a trip');
  }

  function handleAccept(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const newPassenger: string = e.currentTarget.value;
    [passengers_requests].splice([passengers_requests].findIndex(() => newPassenger), 1);
    trip.passengers.push(newPassenger);

    const docRef = readdb.collection('trips').doc(docId[0].id);

    docRef.update(
      trip
    ).then(() => {
      console.log("Document successfully updated!");
    })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    setTrips((prevTrips) => [...prevTrips])

  }

  function handleDenny() {

  }

  return (
    <>

      <Card onClick={tripHandler} className="d-flex align-items-center flex-column mb-2">

        <Container>
          <p>{String(trip.destin)}</p>
          <p>{String(trip.driver)}</p>
          <p>{String(trip.available_places)}</p>
        </Container>
        {currentUser._delegate.email === trip.driver ?
          <>
            <p>Your requests:</p>
            {(trip.passengers_requests).map((element, key) => {
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
                    key={key + 100}
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
            <AddToTripButton trip={trip} />
          </>
        }
      </Card>
    </>
  )
}