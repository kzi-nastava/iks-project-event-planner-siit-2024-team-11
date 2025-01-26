import {Component, inject} from '@angular/core';
import {EventsService} from '../services/events/events-service.service';
import {EventDetails} from '../model/events.model';
import {ActivatedRoute} from '@angular/router';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  private _snackBar = inject(MatSnackBar);
  event: EventDetails;

  constructor(private eventService: EventsService, private route: ActivatedRoute, private dialog: MatDialog) {
    let id: number = route.snapshot.params['eventId'];
    this.eventService.getEvent(id).subscribe({
      next: (event: EventDetails) => {
        this.event = event;
        this.event.agenda = [{
          name: "Activity",
          description: "ASMDNJFHBAJDKM asa csd cdsjc jda",
          location: "Here",
          startTime: new Date(),
          endTime: new Date()
        }];
      },
      error: (event: EventDetails) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while loading the event",
            message: 'Error while loading the event.',
          },
        });
      }
    });
  }

  handleFavoriteItem() {
    this.eventService.toggleFavoriteEvent(this.event.id).subscribe({
      next: any => {
        this.event.isFavorite = !this.event.isFavorite;
        this._snackBar.open("FAVORITE: " + this.event.name, "OK!");
      },
      error: any => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Can't like if you aren't logged in",
            message: 'Please log in to make this your favorite event.',
          },
        });
      }
    })
  }
}
