import { AfterViewInit, Component, DoCheck, Input } from '@angular/core';
import { Notification } from '../model/notification.model';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../user-management/user.service';
import { NotificationService } from '../services/notifications/notification.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserNotificationsInfo } from '../../user-management/model/users.model';
import { MatSidenav } from '@angular/material/sidenav';
import { interval, Subscription, switchMap } from 'rxjs';

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
  @Input() userId: number;
  @Input() userNotificationsInfo: UserNotificationsInfo;
  // loaded
  notificationsLoaded: Boolean = false;
  @Input() notificationsDrawer!: MatSidenav;
  // subscription to check if user has any new notifications
  private notificationInfoPollingSubscription: Subscription | null = null;

  constructor(private notificationService: NotificationService,  
              private userService: UserService, 
              private authService: AuthService,     
              private dialog: MatDialog) {}

  ngAfterViewInit() {
    // - start polling notification info every 30 sec while the user is logged in
    // - checks if there are ANY (not important which or how much) new notifications
    //   so I can show the red dot on notifications' icon
    if (this.userId && !this.userNotificationsInfo.areNotificationsMuted) {
      this.startPollingNotificationInfo();
    } else {
      this.stopPollingNotificationInfo();
    }

    // get notifications when the user opens notifications' icon
    this.notificationsDrawer.openedChange.subscribe((isOpen) => {
      if (isOpen && this.userId) {
        this.updatePaginatedNotifications();
      }
    });
  }

  private startPollingNotificationInfo() {
    if (!this.notificationInfoPollingSubscription) {
      this.notificationInfoPollingSubscription = interval(30000).pipe(
        switchMap(() => this.userService.getUserNotificationsInfo(this.userId))
      ).subscribe({
        next: (result: UserNotificationsInfo) => {
          this.userNotificationsInfo = result;
        },
        error: (err) => {
          console.error('Failed to fetch notificatio info:', err);
        }
      });
    }
  }
  
  private stopPollingNotificationInfo() {
    if (this.notificationInfoPollingSubscription) {
      this.notificationInfoPollingSubscription.unsubscribe();
      this.notificationInfoPollingSubscription = null;
    }
  }

  ngOnDestroy() {
    this.stopPollingNotificationInfo();
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
        this.totalCount = response.totalElements;
        this.notificationsLoaded = true;
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Loading Error",
            message: "Error while loading the notifications!"
          }
        });
        console.error('Failed to fetch notifications:', err);
      },
    });
  }
  
  public handleMuteNotifications() {
    this.userService.toggleUserNotifications(this.userId, !this.userNotificationsInfo.areNotificationsMuted).subscribe({
      next: () => {
        this.userNotificationsInfo.areNotificationsMuted = !this.userNotificationsInfo.areNotificationsMuted;
        if (!this.userNotificationsInfo.areNotificationsMuted) {
          if (!this.notificationInfoPollingSubscription) {
            this.startPollingNotificationInfo();
          }
        }
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
}

