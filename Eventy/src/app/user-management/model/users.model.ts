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

export interface CalendarOccupancy {
  title: string;
  id: number;
  occupancyType: "EVENT" | "PRODUCT" | "SERVICE";
  occupationStartDate: Date;
  occupationEndDate: Date;
}

export interface UserNotificationsInfo {
  id: number;
  areNotificationsMuted: Boolean;
}