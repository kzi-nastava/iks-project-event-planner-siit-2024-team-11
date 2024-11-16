import { Injectable } from '@angular/core';
import {IEventType} from './model/events.model';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  private eventTypes: IEventType[] = [
    {
      name: "Wedding",
      description: "Celebrate two people that are getting married!",
      recommendedCategories: [
        {
          name: "Music",
          description: "Great atmosphere and ambient at your event through MUSIC!"
        }
      ]
    },
    {
      name: "Birthday",
      description: "Celebrate day when your person was born!",
      recommendedCategories: [
        {
          name: "Food",
          description: "Let your guests eat well!"
        }
      ]
    }
  ];

  constructor() {

  }

  getAll(): IEventType[] {
    return this.eventTypes;
  }

  get(name: string): IEventType {
    return this.eventTypes.find(x => x.name === name);
}

  add(type: IEventType): void {
    this.eventTypes.push(type);
  }

  delete(type: IEventType): void {
    this.eventTypes = this.eventTypes.filter((e) => e.name !== type.name);
  }

  update(type: IEventType): void {
    if (!type || !type.name) {
      console.error('Invalid type: missing data or ID.');
      return;
    }

    const index = this.eventTypes.findIndex(t => t.name === type.name);
    if (index !== -1) {
      this.eventTypes[index] = { ...this.eventTypes[index], ...type };
      console.log('Event type updated locally:', this.eventTypes[index]);
    } else {
      console.error('Event type not found.');
    }
  }
}
