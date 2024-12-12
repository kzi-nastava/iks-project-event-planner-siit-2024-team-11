import { Component } from '@angular/core';
import { EventCard } from '../../events/model/event-card.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent {
  stage: Number = 1;
  selectedEvent: EventCard = null;

  constructor(private dialog: MatDialog) {

  }
  onSelectedEventCard(eventCard: EventCard) {
    this.selectedEvent = eventCard
  }

  onContinueButtonClicked(clicked: Boolean) {
    if (clicked && this.selectedEvent != null) {
      this.stage = 2;
    } 

    if (clicked && this.selectedEvent === null) {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Selection Error', 
          message: 'Please make sure that an event is selected before continuing to the next step.',
        },
      });
    }
  }
}
