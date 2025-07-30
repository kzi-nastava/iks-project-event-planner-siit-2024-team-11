import { Component } from '@angular/core';
import { EventCard } from '../../events/model/event-card.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { Router } from '@angular/router';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent {
  stage: Number = 1;
  selectedEvent: EventCard = null;
  passedService: SolutionCard = null;
  selectedService: SolutionCard = null;

  constructor(private dialog: MatDialog,
              private router: Router,
              private solutionsService: SolutionsService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.passedService = navigation.extras.state['selectedService'];
    }
  }

  ngOnInit() {
    if (this.passedService != null) {
      this.solutionsService.getSolution(this.passedService.solutionId).subscribe({
        next: (response: SolutionCard) => {
          this.selectedService = response;
        },
        error: (err) => {
          this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true,
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: "Loading Error",
              message: 'Service loading failed! Try again!',
            },
          });
        },
      });
    }
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
