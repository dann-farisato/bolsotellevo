import { Container, Card, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { GameType } from "../../../Type";


export default function Game({ nextGame }: { nextGame: GameType }) {

  const navigate = useNavigate();

  console.log('===========>', nextGame);

  function gameHandler() {
    navigate('/trips/' + String(nextGame.Team))
  }

  return (


    <div onClick={gameHandler} className="d-flex align-items-center flex-column mb-2">

      <Container>
        {
          nextGame.Team ?
            <>
              <Container className="d-flex p-2">

                <Container>

                  <Container className="d-flex mt-3 w-20">
                    <Container>
                      <Image className="mb-2" height={30} src={require(`../../../logos/Nacional.png`)} alt="icon" />
                    </Container>
                    <Container>
                      <p>Nacional</p>
                    </Container>
                  </Container>
                  <Container className="d-flex w-20">
                    {/* <Container>
                      <Image className="mb-2" height={30} src={require(`../../../logos/Nacional.png`)} alt="icon" />
                    </Container> */}
                    <Container>
                      <p className="btn badge bg-success text-light">{nextGame.Team}</p>
                    </Container>
                  </Container>
                </Container>

                <Container className="d-flex p-3">
                  <>
                    {moment(nextGame.Date.toDate()).format("DD/MM/YY h:mm")}
                  </>
                </Container>
              </Container>
            </>
            :
            <>
              <Container className="mt-4 ms-4">
                {/* {String(nextGame)}   <--- This is the error [object Object]*/}
              </Container>

              <Container className="d-flex">
                {/* <Container className="ms-4 mt-2">
                    <Image className="mb-2" height={30} src={require(`../../../logos/Nacional.png`)} alt="icon" />
                  </Container> */}
                <Container>

                  {(nextGame.trip.passengers.length === 0) ? " You have no passengers yet" :
                    <Container>
                      <h4>Your pasengers:</h4>
                      {(nextGame.trip.passengers).map((element, key) => <p key={key}>{element}</p>)}
                    </Container>
                  }
                  <Container className="mb-4">
                    Time of the trip: {nextGame.trip.date}
                  </Container>

                </Container>
              </Container>
            </>
        }

      </Container>

    </div>
  )
}