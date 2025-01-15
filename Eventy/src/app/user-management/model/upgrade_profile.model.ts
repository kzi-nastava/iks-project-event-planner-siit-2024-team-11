export interface UpgradeProfile {
   email: string;
   accountType: string;
   
   firstName: string; // null if accountType = "SOLUTIONS PROVIDER"
   lastName: string; // null if accountType = "SOLUTIONS PROVIDER"

   name: string; // null if accountType = "EVENT ORGANIZER"
   description: string; // null if accountType = "EVENT ORGANIZER"

   profilePictures: string[];
 }