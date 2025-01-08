
export interface EventCard {
  eventId: number;
  name: String;
  description: String;
  maxNumberParticipants: number;
  isOpen: Boolean;
  eventTypeName: String;
  locationName: String;
  startDate: Date;
  endDate: Date;
  organiserId: Number; // when we click on picture/name it shows organiser profile
  organiserName: String;
  organiserImage: String;
 }