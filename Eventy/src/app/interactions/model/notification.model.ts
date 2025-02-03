export enum NotificationType {
   EVENT_CHANGE,
   RATING_EVENT,
   RATING_SERVICE,
   RATING_PRODUCT,
   CATEGORY_UPDATED,
   NEW_CATEGORY_SUGGESTION_SERVICE,
   NEW_CATEGORY_SUGGESTION_PRODUCT,
   CATEGORY_SUGGESTION_ACCEPTED,
   CATEGORY_SUGGESTION_CHANGED,
   CATEGORY_SUGGESTION_REPLACED,
   REMINDER_SERVICE
}

export interface Notification {
  id: number;
  type: NotificationType;
  redirectionId: number;
  title: String;
  message: String;
  graderImage: String;
  graderEmail: String;
  grade: number;
  timestamp: Date;
}