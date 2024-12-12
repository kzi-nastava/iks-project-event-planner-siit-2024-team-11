import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventCard } from '../../events/model/event-card.model';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent {
  private _snackBar = inject(MatSnackBar);
  stage: Number = 1;
  selectedEvent: EventCard = null;

  onSelectedEventCard(eventCard: EventCard) {
    this.selectedEvent = eventCard
  }

  onContinueButtonClicked(clicked: Boolean) {
    if (clicked && this.selectedEvent != null) {
      this.stage = 2;
    } 

    if (clicked && this.selectedEvent === null) {
      this._snackBar.open("You need to click an event!!!");
    }
  }
}
