import { Component, Input } from '@angular/core';
import { EventCard } from '../model/event-card.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() eventCard: EventCard;
}
