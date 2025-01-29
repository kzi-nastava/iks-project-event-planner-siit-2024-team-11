export enum Status {
   ACCEPTED,
   PENDING,
   DENIED
}

export interface Category {
   name: string,
   description: string,
   status: Status
}