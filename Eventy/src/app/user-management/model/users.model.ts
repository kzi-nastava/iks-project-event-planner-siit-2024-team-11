export interface User {
  email: string;
  password: string;
  images?: string[];
  address: string;
  phoneNumber: string;
}

// combine everything into one interface?
export interface Organizer extends User {
  firstName: string;
  lastName: string;
}

export interface Provider extends User {
  name: string;
  description: string;
}
