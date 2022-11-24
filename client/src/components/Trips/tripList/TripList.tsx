import React from 'react';
import { TripsFromFB, TripType } from '../../../Type';
import Trip from '../trip/Trip';

type TripListProps = {
  trips: TripsFromFB[],
  setTrips: React.Dispatch<React.SetStateAction<TripsFromFB[]>>
}
export default function TripList({ trips, setTrips }: TripListProps) {

  console.log(trips)

  return (

    <div className="d-flex flex-column">
      {trips.map((trip: TripsFromFB, key: number) => (
        <Trip trip={trip} key={key} setTrips={setTrips} />
      ))}
    </div>

  )
}
