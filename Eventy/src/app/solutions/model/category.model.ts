export enum Status {
   PENDING,
   ACCEPTED,
   DENIED
}

export interface Category {
   name: string,
   description: string,
   status: Status
}