import { Solution } from "./solutions.model";

export enum ReservationConfirmationType {
   MANUAL,
   AUTOMATIC
}

export interface Service extends Solution {
   specifics: string,
   minReservationTime: number,
   maxReservationTime: number,
   reservationDeadline: number,
   cancellationDeadline: number,
   reservationType: ReservationConfirmationType,
}