import {Component, Input} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrl: './nav-drawer.component.css'
})
export class NavDrawerComponent {
  @Input() drawer!: MatSidenav;
}
