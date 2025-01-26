import {Component, Input, inject} from '@angular/core';
import {EventCard} from '../model/event-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {EventsService} from '../services/events/events-service.service';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  private _snackBar = inject(MatSnackBar);
  @Input() eventCard: EventCard;
  @Input() isClickable: Boolean;

  constructor(private eventService: EventsService, private dialog : MatDialog) {}

  handleFavoriteItem() {
    this.eventService.toggleFavoriteEvent(this.eventCard.eventId).subscribe({
      next: any => {
        this.eventCard.isFavorite = !this.eventCard.isFavorite;
        this._snackBar.open("FAVORITE: " + this.eventCard.name, "OK!");
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

