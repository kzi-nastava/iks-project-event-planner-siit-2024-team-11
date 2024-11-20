import { Component } from '@angular/core';
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
  allEvents: EventCard[] = [];
  sortValue: string = "Event Type";

  constructor(eventsService: EventsServiceService) {
    this.allEvents = eventsService.getAllEvents();
  }
}
