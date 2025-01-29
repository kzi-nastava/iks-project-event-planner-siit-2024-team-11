import { Component, Input } from '@angular/core';
import { Notification } from '../model/notification.model';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../user-management/user.service';
import { NotificationService } from '../services/notifications/notification.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css'
})
export class AllNotificationsComponent {
  // all notifications
  paginatedNotifications: Notification[] = []; 
  // pageable
  pageEvent: PageEvent;  
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;
  // user info
  userId: number;
  areNotificationsMuted: Boolean = false;
  // loaded
  loaded: number = 0;

  constructor(private notificationService: NotificationService, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.updatePaginatedNotifications();
  }

  public loadUserInfo() {
    this.userId = this.authService.getId();

    this.userService.getUserNotificationsInfo(this.userId).subscribe({
      next: (result: Boolean) => {
        this.areNotificationsMuted = result;
        this.loaded += 1;
        console.log(this.loaded)
      }
    });
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
        this.loaded += 1;
        console.log(this.loaded)
      },
      error: (err) => {
        console.error('Failed to fetch notifications:', err);
      },
    });
  }
  
  public handleMuteNotifications() {
    if (this.areNotificationsMuted) {
      this.areNotificationsMuted = false;
    } else {
      this.areNotificationsMuted = true;
    }
  }
}
