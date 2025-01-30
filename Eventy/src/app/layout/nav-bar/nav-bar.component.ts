import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {Router} from '@angular/router';
import { UserNotificationsInfo } from '../../user-management/model/users.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  role: string = '';
  // side drawers
  @Input() drawer!: MatSidenav;
  @Input() notificationsDrawer!: MatSidenav;
  // for displaying red dot near notifications icon if there are new notifications
  @Input() userNotificationsInfo!: UserNotificationsInfo;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    })
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.authService.setUser();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}
