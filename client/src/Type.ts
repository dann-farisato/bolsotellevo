export type GameType = {
    Team: string,
    Date: any,
    Location: string,
    trip: TripDetails,
    Drivers: string
}
export interface TripType {
    passengers: string[],
    trip: TripDetails,
    passengers_requests: string[],

}

export interface TripDetails {
    destin: string,
    date: any,
    driver: string,
    available_places: number,
    origin: any
    passengers: string[],
    passengers_requests: string[],
}

export interface TripsFromFB {
    trip: TripDetails
}

export interface DocAndIdType {
    driver: string,
    id: string
}

export interface LoginType {
    currentUser: string,
    login: string,
    signup: string,
    logout: string,
    resetPassword: string,
    updateEmail: string,
    updatePassword: string
}