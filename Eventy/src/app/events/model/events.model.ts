import { EventTypeForCards } from "./event-type.model";
import { Location } from "./location.model";
import {CategoryWithId} from '../../solutions/model/category-with-id.model';

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
