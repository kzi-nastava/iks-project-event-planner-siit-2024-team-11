import {Component, Input, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrl: './nav-drawer.component.css'
})
export class NavDrawerComponent implements OnInit {
  @Input() drawer!: MatSidenav;

  role: string = '';
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    })
  }
}
