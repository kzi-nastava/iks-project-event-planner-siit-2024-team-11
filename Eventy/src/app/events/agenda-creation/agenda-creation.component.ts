import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IActivity} from '../model/events.model';

@Component({
  selector: 'app-agenda-creation',
  templateUrl: './agenda-creation.component.html',
  styleUrl: './agenda-creation.component.css'
})
export class AgendaCreationComponent {
  activityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  displayedColumns: string[] = ['name', 'description', 'location', 'startTime', 'endTime'];
  agenda: IActivity[] = [{
    "name": "something",
    "description": "hey",
    "location": "here",
    "startTime": new Date(),
    "endTime": new Date(20)
  }];

  addActivity() : void {
    this.agenda.push(this.activityForm.value);
  }
}
