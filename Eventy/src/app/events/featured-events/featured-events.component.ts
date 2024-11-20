import { Component, Input } from '@angular/core';
import { EventCard } from '../model/event-card.model';
import { EventsServiceService } from '../services/events/events-service.service';


@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.component.html',
  styleUrl: './featured-events.component.css'
})
export class FeaturedEventsComponent {
  featuredEvents: EventCard[] = [];

  constructor(eventsService: EventsServiceService) {
    this.featuredEvents = eventsService.getFeaturedEvents();
  }
}
