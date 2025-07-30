import { AfterViewInit, Component, DoCheck, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Notification } from '../model/notification.model';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../user-management/user.service';
import { NotificationService } from '../services/notifications/notification.service';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserNotificationsInfo } from '../../user-management/model/users.model';
import { MatSidenav } from '@angular/material/sidenav';
import { Client } from '@stomp/stompjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css'
})
export class AllNotificationsComponent implements AfterViewInit {
  // all notifications
  paginatedNotifications: Notification[] = []; 
  // pageable
  pageEvent: PageEvent;  
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;
  // user info
  @Input() userId: number; // from app
  @Input() userNotificationsInfo: UserNotificationsInfo; // from app
  @Output() notificationsInfoUpdated = new EventEmitter<UserNotificationsInfo>(); // to app (for red dot on notifications icon)
  // loaded
  notificationsLoaded: Boolean = false;
  @Input() notificationsDrawer!: MatSidenav;
  // for web sockets
  private stompClient: Client | null = null;
  private websocketConnected: boolean = false;

  constructor(private notificationService: NotificationService,  
              private userService: UserService,    
              private dialog: MatDialog,
              private router: Router) {}

  ngAfterViewInit() {
    if (this.userId && !this.userNotificationsInfo.areNotificationsMuted) {
      this.connectWebSocket();    
    } else {
      if (this.stompClient || this.websocketConnected) {
        this.stompClient.deactivate();
        console.log('WebSocket connection closed');
      }
    }

    this.notificationsDrawer.openedChange.subscribe((isOpen) => {
      if (this.userId) {
        if (isOpen) {
          this.updatePaginatedNotifications();
        } else {
          if (!this.userNotificationsInfo.areNotificationsMuted) {
            this.updateLastReadNotifications();
          }  
        }  
      }      
    });
  }

  private connectWebSocket() {
    const socket = new WebSocket('http://localhost:8080/web-notifications'); 

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000, // Reconnect after 5 seconds if disconnected
      onConnect: () => {
        this.websocketConnected = true;
        console.log('Connected to WebSocket');
  
        // subscribe
        this.stompClient?.subscribe(`/topic/web/${this.userId}`, (message) => {
          const notification: Notification = JSON.parse(message.body);
          this.handleIncomingNotification(notification);
        });
      },
      onDisconnect: () => {
        this.websocketConnected = false;
        console.log('Disconnected from WebSocket');
      }
    });

    this.stompClient = stompClient;
    this.stompClient.activate();
  }

  private handleIncomingNotification(notification: Notification) {
    this.paginatedNotifications.unshift(notification); // unshift adds to the top of list
    this.totalCount++;
    this.userNotificationsInfo.hasNewNotifications = true; 
    this.notificationsInfoUpdated.emit(this.userNotificationsInfo); 
    console.log('New notification received:', notification);
  }

  ngOnDestroy() {
    if (!this.userNotificationsInfo.areNotificationsMuted) {
      this.updateLastReadNotifications();
    } 

    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('WebSocket connection closed');
    }
  }

  public onPageChange(event?: PageEvent){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedNotifications();
  }

  private updatePaginatedNotifications(): void {
    this.notificationService.getNotifications(
      this.userId,
      { page: this.currentPage, size: this.pageSize }, 
    ).subscribe({
      next: (response: PagedResponse<Notification>) => {
        this.paginatedNotifications = response.content;
        console.log(this.paginatedNotifications);
        this.totalCount = response.totalElements;
        this.notificationsLoaded = true;        
      },
      error: (err) => {
        this.notificationsLoaded = false;
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Loading Error",
            message: "Error while loading the notifications!"
          }
        });
      },
    });
  }

  public updateLastReadNotifications() {
    this.userService.updateLastReadNotifications(this.userId).subscribe({
      next: (response: Date) => {
        this.userNotificationsInfo.lastReadNotifications = response;
        this.userNotificationsInfo.hasNewNotifications = false;
        this.notificationsInfoUpdated.emit(this.userNotificationsInfo);
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Error",
            message: "An unexpected error occurred while updating last read!"
          }
        });
      }
    });
  }
  
  public handleMuteNotifications() {
    this.userService.toggleUserNotifications(this.userId, !this.userNotificationsInfo.areNotificationsMuted).subscribe({
      next: () => {
        this.userNotificationsInfo.areNotificationsMuted = !this.userNotificationsInfo.areNotificationsMuted;
        this.notificationsInfoUpdated.emit(this.userNotificationsInfo);
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Error",
            message: "An unexpected error occurred while toggling the notification option!"
          }
        });
      }
    });
  } 

  public handleNotificationClick(notification: Notification) {
    if (!this.userNotificationsInfo.areNotificationsMuted) {
      this.updateLastReadNotifications();
    }

    switch (notification.type.toString()) {
      case "EVENT_CHANGE":
        this.router.navigate(['events/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });
        break;

      case "RATING_EVENT":
        this.router.navigate(['events/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });
        break;

      case "RATING_SERVICE":
        this.router.navigate(['solutions/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });
        break;

      case "RATING_PRODUCT":
        this.router.navigate(['solutions/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });
        break;

      case "CATEGORY_UPDATED":
        this.router.navigate(['profile']).then(() => {
          window.location.reload();
        });
        break;

      case "NEW_CATEGORY_SUGGESTION":
        this.router.navigate(['solution-categories']).then(() => {
          window.location.reload();
        });
        break;

      case "CATEGORY_SUGGESTION_ACCEPTED":
        this.router.navigate(['solutions/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });
        break;

      case "CATEGORY_SUGGESTION_CHANGED":
        console.log(notification.redirectionId)
        this.router.navigate(['solutions/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });  
        break;

      case "CATEGORY_SUGGESTION_REPLACED":
        this.router.navigate(['solutions/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });
        break;

      case "REMINDER_SERVICE":
        this.router.navigate(['events/' + notification.redirectionId]).then(() => {
          window.location.reload();
        });
        break;

      default:
        return;
    }
  }
}

