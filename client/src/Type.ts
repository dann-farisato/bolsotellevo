export type GameType = {
    Team: string,
    Date: any,
    Location: string,
    trip: TripType,
    Drivers: string
}
export interface TripType {
    passengers: string[],
    trip: string,
    destin: string,
    date: any,
    passengers_requests: string[],
    driver: string,
    available_places: number
}

export interface DocAndIdType {
    driver: number,
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