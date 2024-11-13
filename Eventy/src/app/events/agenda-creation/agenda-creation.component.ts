import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IActivity} from '../model/events.model';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-agenda-creation',
  templateUrl: './agenda-creation.component.html',
  styleUrl: './agenda-creation.component.css',
  providers: [provideNativeDateAdapter()]
})
export class AgendaCreationComponent {
  activityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    timeRange: new FormControl([], Validators.required)
  });

  displayedColumns: string[] = ['name', 'description', 'location', 'startTime', 'endTime'];
  agenda: IActivity[] = [{
    "name": "something",
    "description": "hey",
    "location": "here",
    "timeRange": [new Date(), new Date(20)]
  }];

  minStartTime: Date = new Date();

  addActivity() : void {
    this.agenda.push(this.activityForm.value);
    this.minStartTime = this.activityForm.value.timeRange[1];
    this.activityForm.reset();
  }

  formatDate(date : Date) : string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',   // full day name (e.g., Monday)
      year: 'numeric',   // year (e.g., 2024)
      month: 'long',     // full month name (e.g., October)
      day: 'numeric',    // day of the month (e.g., 13)
      hour: '2-digit',   // hour (e.g., 03 PM)
      minute: '2-digit'  // minute (e.g., 45)
    });
  }
}
