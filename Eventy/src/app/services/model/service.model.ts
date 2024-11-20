import { Solution } from "../../shared/model/solution.model";

export interface Service extends Solution {
    specifics: string;
    reservationDuration: [number, number | null];
    reservationDeadline: number;
    isAutomaticallyAccepted: boolean;
}