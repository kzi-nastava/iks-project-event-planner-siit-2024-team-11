import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isEventsSelected : boolean = true;

  switchTab() : void {
    this.isEventsSelected = !this.isEventsSelected;
  }
}
