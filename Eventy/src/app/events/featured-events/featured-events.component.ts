import { Component, Input } from '@angular/core';
import { EventType } from '../model/event-type.model';
import { Location } from '../model/location.model';
import { PrivacyType } from '../model/events.model';
import { Event } from '../model/events.model';
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
