import { EventTypeCard } from "../../events/model/events.model";
import { Category } from "../../solutions/model/category.model";

export interface CreateService {
    name: string;
    description: string;
    price: number;
    discount: number;
    imageUrls: string[];
    providerId: number;
    categoryId: number;
    relatedEventTypeIds: number[];
    specifics: string;
    minReservationTime: number;
    maxReservationTime: number;
    reservationDeadline: number;
    cancellationDeadline: number;
    automaticReservationAcceptance: boolean;
}

export interface UpdateService {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    imageUrls: string[];
    isVisible: boolean;
    isAvailable: boolean;
    relatedEventTypeIds: number[];
    specifics: string;
    minReservationTime: number;
    maxReservationTime: number;
    reservationDeadline: number;
    cancellationDeadline: number;
    automaticReservationAcceptance: boolean;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    imageUrls: string[];
    isVisible: boolean;
    isAvailable: boolean;
    category: Category;
    relatedEventTypes: EventTypeCard[];
    specifics: string;
    minReservationTime: number;
    maxReservationTime: number;
    reservationDeadline: number;
    cancellationDeadline: number;
    automaticReservationAcceptance: boolean;
}