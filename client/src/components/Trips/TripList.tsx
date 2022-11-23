import { DocumentData } from '@firebase/firestore-types';
import React, { Key } from 'react';
import { GameType, TripType } from '../../Type';
import Trip from './Trip';

type TripListProps = {
  trips: TripType[],
  setTrips: React.Dispatch<React.SetStateAction<TripType[]>>
}
export default function TripList({ trips, setTrips }: TripListProps) {

  console.log(trips)

  return (

    <div className="d-flex flex-column">
      {trips.map((trip: TripType, key: number) => (
        <Trip trip={trip} key={key} />
      ))}
    </div>

  )
}
