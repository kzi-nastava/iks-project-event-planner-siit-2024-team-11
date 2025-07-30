export enum Status {
   ACCEPTED,
   PENDING,
   DENIED
}

export interface Review {
   id: number;
   comment: String;
   grade: number;
   senderEmail: String;
   recipientEmail: String;
   title: String; // event/product/service name
   status: Status;
   isDeleted: boolean;
   senderName: string;
   senderAvatar: string;
}

export interface CreateReview {
   graderId: number;
   solutionId: number;
   eventId: number;
   grade: number;
   comment: String;
}

export interface CheckExistingSolutionReview {
   userId: number;
   solutionId: number;
}