import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventCard } from '../model/event-card.model';
import { ViewEncapsulation } from '@angular/core';
import { EventsServiceService } from '../services/events/events-service.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AllEventsComponent {
  private _snackBar = inject(MatSnackBar);
  allEvents: EventCard[] = [];
  sortValue: string = "Event Type";
  @Input() isCardClickable: Boolean;
  selectedEventCard: EventCard = null;
  @Output() clickedEventCardEventEmitter = new EventEmitter<EventCard>; // to reservation-select-event.ts

  constructor(eventsService: EventsServiceService) {
    this.allEvents = eventsService.getAllEvents();
  }

  handleCardClick(eventCard: EventCard) {
    if (this.isCardClickable) {
      this.selectedEventCard = eventCard; 
      this.clickedEventCardEventEmitter.emit(eventCard);
      
      this._snackBar.open("Clicked: " + this.selectedEventCard.event.name, "OK!");
    }
  }
}
