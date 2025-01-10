import {Component, Input, inject} from '@angular/core';
import {EventCard} from '../model/event-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  private _snackBar = inject(MatSnackBar);
  @Input() eventCard: EventCard;
  @Input() isClickable: Boolean;

  constructor() {}

  handleFavoriteItem() {
    if (!this.isClickable) {
      this._snackBar.open("FAVORITE: " + this.eventCard.name, "OK!");
    }
  }

  handleSeeMore() {
    if (!this.isClickable) {
      this._snackBar.open("SEE MORE: " + this.eventCard.name, "OK!");
    }
  }
}

