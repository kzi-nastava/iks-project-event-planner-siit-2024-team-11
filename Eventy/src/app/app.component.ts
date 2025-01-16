import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Eventy';
  showFooter: boolean = true;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const excludedRoutes = ['/login', '/register', '/fast-registration', '/upgrade-profile'];
        this.showFooter = !excludedRoutes.some(route => event.url.startsWith(route)); 
      }
    });
  }
}
