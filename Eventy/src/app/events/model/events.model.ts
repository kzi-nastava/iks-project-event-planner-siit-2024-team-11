import { EventTypeForCards } from "./event-type.model";
import { Location } from "./location.model";
import {CategoryWithId} from '../../solutions/model/category-with-id.model';

export interface Activity {
  name: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
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
  eventType: EventTypeForCards
}

export interface EventType {
  id: number;
  name: string;
  description: string;
  recommendedSolutionCategories: CategoryWithId[];
}

export interface EventTypeWithActivity {
  id: number;
  name: string;
  description: string;
  recommendedSolutionCategories: CategoryWithId[];
  isActive: boolean;
}

export interface CreateEventType {
  name: string;
  description: string;
  recommendedSolutionCategoriesIds: number[];
}

export interface UpdateEventType {
  id: number;
  name: string;
  description: string;
  recommendedSolutionCategoriesIds: number[];
}

export interface EventTypeCard {
  id: number;
  name: string;
}

export interface OrganizeEvent {
  name: string;
  description: string;
  maxNumberParticipants: number;
  isPublic: boolean;
  eventTypeId: number;
  createLocationDTO: Location;
  date: Date;
  agenda: Activity[];
  emails: string[];
  organizerId: number;
}

export interface EventBasicInformation {
  name: string;
  description: string;
  maxNumberParticipants: number;
  isPublic: boolean;
  eventTypeId: number;
  createLocationDTO: Location;
  date: Date;
}
