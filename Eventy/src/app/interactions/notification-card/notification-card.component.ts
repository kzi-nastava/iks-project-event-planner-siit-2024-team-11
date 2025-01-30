import { Component, Input } from '@angular/core';
import { Notification, NotificationType } from '../model/notification.model';
import { UserNotificationsInfo } from '../../user-management/model/users.model';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent {
  @Input() notification: Notification;
  @Input() userNotificationsInfo: UserNotificationsInfo;
  // color
  borderColor: string;

  ngOnInit() {
   console.log(this.notification);
  }

  public getBorderColor(): string {
    switch (this.notification.type.toString()) {
      case "EVENT_CHANGE":
        return "solid 5px #808AAC"; // Eventy blue

      case "RATING_EVENT":
        return "solid 5px #808AAC"; // Eventy blue

      case "RATING_SERVICE":
        return "solid 5px #FAD609"; // Service yellow

      case "RATING_PRODUCT":
        return "solid 5px #DD79AE"; // Product pink

      case "CATEGORY_UPDATED":
        return "solid 5px #FF9B30"; // orange

      case "NEW_CATEGORY_SUGGESTION_SERVICE":
        return "solid 5px #FAD609"; // Service yellow

      case "NEW_CATEGORY_SUGGESTION_PRODUCT":
        return "solid 5px #DD79AE"; // Product pink

      case "CATEGORY_SUGGESTION_ACCEPTED":
        return "solid 5px #39B839"; // green

      case "CATEGORY_SUGGESTION_CHANGED":
        return "solid 5pxrgb(240, 118, 74)"; // dark orange-red

      case "CATEGORY_SUGGESTION_REPLACED":
        return "solid 5px #F25454"; // red

      case "REMINDER_SERVICE":
        return "solid 5px #42AFD0"; // blue-teal

      default:
        return "solid 5px #808AAC";
    }

  }
}
