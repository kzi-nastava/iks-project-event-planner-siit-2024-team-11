import { Component, Input } from '@angular/core';
import { EventCardDTO } from '../model/event-card-DTO.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() eventCardDTO: EventCardDTO;
}
