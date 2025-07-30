import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {Router} from '@angular/router';
import { UserNotificationsInfo } from '../../user-management/model/users.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

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

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

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

  openChat(): void {
    if(this.authService.getRole()) {
      this.router.navigate(['chat'])
    } else {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: "Can't open chat if you are not logged in",
          message: 'Please log in to access the chat.',
        },
      });
    }
  }
}
