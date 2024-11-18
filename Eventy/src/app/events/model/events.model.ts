import { EventType } from "./event-type.model";
import { Location } from "./location.model";

export interface IActivity {
  name: string;
  description: string;
  location: string;
  timeRange: [Date, Date]
}

export enum PrivacyType {
  PUBLIC, 
  PRIVATE
}

export interface Event {
  name: string,
  description: string,
  maxParticipants: number,
  privacyType: PrivacyType,
  date: Date,
  location: Location
  eventType: EventType
}
