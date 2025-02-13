export enum Status {
   ACCEPTED,
   PENDING,
   DENIED
}

export interface Report {
   id: number;
   comment: String;
   grade: number;
   senderEmail: String;
   recipientEmail: String;
   title: String; // event/product/service name
   status: Status;
   isDeleted: boolean;
}

export interface CreateReport {
   reason: String,
   senderUserId: number;
   reportedUserId: number;
}