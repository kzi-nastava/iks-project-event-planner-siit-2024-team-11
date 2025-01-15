export interface UpgradeProfileData {
   email: string;
   accountType: string;
   
   firstName: string; // null if accountType = "SOLUTIONS PROVIDER"
   lastName: string; // null if accountType = "SOLUTIONS PROVIDER"

   companyName: string; // null if accountType = "EVENT ORGANIZER"
   description: string; // null if accountType = "EVENT ORGANIZER"

   profilePictures: string[];
 }