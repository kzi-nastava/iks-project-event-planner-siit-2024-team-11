import { Category } from "./category.model"

export interface Solution {
   name: string,
   category: Category,
   description: string,
   price: number,
   discount: number,
   imageUrls: string[],
   isDeleted: boolean,
   isVisible: boolean,
   isAvailable: boolean,
   specifics: string,
}

export interface SolutionDTO {
   solutionId: number; // serviceId or productId
   type: "SERVICE" | "PRODUCT"; // "SERVICE" or "PRODUCT"
   name: string;
   categoryName: string;
   description: string;
   specifics?: string; // only for services
   minReservationTime?: number; // only for services
   maxReservationTime?: number; // only for services
   reservationDeadline?: number; // only for services
   cancellationDeadline?: number; // only for services
   reservationType?: "MANUAL" | "AUTOMATIC"; // only for services
   eventTypeNames: string[];
   price: number;
   discount: number;
   images: string[];
   isAvailable: boolean;
   isVisible: boolean;
   providerId: number;
   providerName: string;
   providerImageUrl: string;
   isFavorite: boolean;
}

export interface SolutionHistory {
   id: number,
   providerName: string,
   name: string,
   description: string,
   price: number,
   discount: number,
   cancellationDeadline: number
}