import { Component } from '@angular/core';
import { EventCardComponent } from '../../events/event-card/event-card.component';
import { isEarlyEventType } from '@angular/core/primitives/event-dispatch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isEventsSelected : boolean = false;

  switchTab() : void {
    this.isEventsSelected = !this.isEventsSelected;
  }
}
