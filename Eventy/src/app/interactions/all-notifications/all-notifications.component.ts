import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css'
})
export class AllNotificationsComponent {
  @Input() notifications_drawer!: MatSidenav;
}
