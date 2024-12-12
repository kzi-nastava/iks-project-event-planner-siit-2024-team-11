import { Component, Output, EventEmitter } from '@angular/core';
import { EventCard } from '../model/event-card.model';

@Component({
  selector: 'app-reservation-select-event',
  templateUrl: './reservation-select-event.component.html',
  styleUrl: './reservation-select-event.component.css'
})
export class ReservationSelectEventComponent {
  @Output() continueButtonClicked = new EventEmitter<Boolean>;
  selectedEventCard: EventCard = null;
  @Output() selectedEventCardEventEmitter = new EventEmitter<EventCard>

  ngOnInit() {
    this.continueButtonClicked.emit(false);
    this.selectedEventCardEventEmitter.emit(null);
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo({
      top: 0,
      behavior: 'smooth' // smooth scrolling
    });
  }

  onEventSelected(eventCard: EventCard) {
    this.selectedEventCard = eventCard;
  }

  onContinueButtonClicked() {
    this.selectedEventCardEventEmitter.emit(this.selectedEventCard);
    this.continueButtonClicked.emit(true) 
  }
}
