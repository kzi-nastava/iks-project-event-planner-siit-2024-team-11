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

  constructor() {

  }

  handleFavoriteItem() {
    this._snackBar.open("FAVORITE: " + this.eventCard.event.name, "OK!");
  }

  handleSeeMore() {
    this._snackBar.open("FAVORITE: " + this.eventCard.event.name, "OK!");
  }
}

