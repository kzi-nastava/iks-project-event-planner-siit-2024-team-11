export interface SolutionCard {
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
   firstImageUrl: string;
   isAvailable: boolean;
   providerId: number;
   providerName: string;
   providerImageUrl: string;
}
