import { AfterViewInit, Component, DoCheck } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { AuthService } from './infrastructure/auth/auth.service';
import { UserService } from './user-management/user.service';
import { UserNotificationsInfo } from './user-management/model/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title: string = 'Eventy';
  showFooter: boolean = true;
  drawerWidth = '28vw';
  loggedInUserId: number; // for notifications
  userNotificationsInfo: UserNotificationsInfo;

  constructor(private router: Router,  
              private authService: AuthService,
              private userService: UserService,) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const excludedRoutes = ['/login', '/register', '/fast-registration', '/upgrade-profile'];
        this.showFooter = !excludedRoutes.some(route => event.url.startsWith(route)); 
      }
    });
  }

  ngAfterViewInit() {
    this.loadLoggedInUserNotificationsInfo();
  }

  private loadLoggedInUserNotificationsInfo() {
    this.loggedInUserId = this.authService.getId();

    if (this.loggedInUserId !== null) {
      this.userService.getUserNotificationsInfo(this.loggedInUserId).subscribe({
        next: (result: UserNotificationsInfo) => {
          this.userNotificationsInfo = result;
        }
      });
    }
  }
  
}
