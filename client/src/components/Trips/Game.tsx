import { Container, Card, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { GameType } from "../../Type";


export default function Game({ nextGame }: { nextGame: GameType }) {

  const navigate = useNavigate();


  function gameHandler() {
    navigate('/trips/' + String(nextGame.Team))
  }

  return (
    <>
      <Container className="mt-4">
        <Card onClick={gameHandler} className="d-flex align-items-center flex-column mb-2">

          <Container>
            {
              nextGame.Team ?
                <>
                  <Container className="d-flex">

                    <Container>

                      <Container className="d-flex mt-2">
                        <Container>
                          <Image className="mb-2" height={30} src={require(`../../logos/Nacional.png`)} alt="icon" />
                        </Container>
                        <Container>
                          <p>Nacional</p>
                        </Container>
                      </Container>
                      <Container className="d-flex">
                        <Container>
                          <Image className="mb-2" height={30} src={require(`../../logos/${nextGame.Team}.png`)} alt="icon" />
                        </Container>
                        <Container>
                          <p>{nextGame.Team}</p>
                        </Container>
                      </Container>
                    </Container>

                    <Container>
                      <>
                        {moment(nextGame.Date.toDate()).format("MMMM Do YYYY, h:mm")}
                      </>
                    </Container>
                    <Container>
                      <>

                      </>
                    </Container>
                  </Container>
                </>
                :
                <>
                  <Container className="mt-4 ms-4">
                    {String(nextGame.trip.trip.destin)}
                  </Container>

                  <Container className="d-flex">
                    <Container className="ms-4 mt-2">
                      <Image className="mb-2" height={30} src={require(`../../logos/${nextGame.trip.trip.destin}.png`)} alt="icon" />
                    </Container>
                    <Container>

                      {(nextGame.trip.passengers.length === 0) ? " You have no passengers yet" :
                        <Container>
                          <h4>Your pasengers:</h4>
                          {(nextGame.trip.passengers).map((element, key) => <p key={key}>{element}</p>)}
                        </Container>
                      }
                      <Container className="mb-4">
                        Time of the trip: {nextGame.trip.trip.date}
                      </Container>

                    </Container>
                  </Container>
                </>
            }

          </Container>

        </Card>
      </Container>
    </>
  )
}