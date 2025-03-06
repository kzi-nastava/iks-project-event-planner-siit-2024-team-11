export enum Status {
   ACCEPTED,
   PENDING,
   DENIED
}

export interface Report {
   id: number;
   reason: String;
   senderEmail: String;
   reportedUserEmail: String;
}

export interface CreateReport {
   reason: String,
   senderUserId: number;
   reportedUserId: number;
}