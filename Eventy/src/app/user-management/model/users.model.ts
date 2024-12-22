export interface User {
  id: number;
  userType: string;
  profilePictures: string[];
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
}

export interface UpdateUser {
  id: number;
  profilePictures: string[];
  email: string;
  oldPassword: string;
  password: string;
  confirmedPassword: string;
  firstName: string;
  lastName: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
}
