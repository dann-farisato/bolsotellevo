import Trip from './Trip';

export default function TripList({trips, setTrips}) {

  return (
    <>
    <div className="d-flex flex-column">
    {trips.map((trip, key)=>(
    <Trip trip={trip} setTrips={setTrips} key={key}/>
    ))}
    </div>
    </>
  )
}
