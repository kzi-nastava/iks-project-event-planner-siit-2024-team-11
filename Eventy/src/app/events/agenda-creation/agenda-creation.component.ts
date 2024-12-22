import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Activity} from '../model/events.model';
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  InvalidInputDataDialogComponent
} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
    timeRange: new FormControl([], [Validators.required, this.validateTimeRange()])
  });

  displayedColumns: string[] = ['name', 'description', 'location', 'startTime', 'endTime'];
  agenda: Activity[] = [];

  @Output() AgendaEventEmitter = new EventEmitter<Activity[]>();
  @Input() minStartTime!: Date;

  constructor(private dialog: MatDialog) {
  }

  addActivity() : void {
    this.activityForm.controls['name'].setValue(this.activityForm.controls['name'].value)
    this.activityForm.controls['description'].setValue(this.activityForm.controls['description'].value)
    this.activityForm.controls['location'].setValue(this.activityForm.controls['location'].value)
    this.activityForm.controls['timeRange'].setValue(this.activityForm.controls['timeRange'].value)

    if(this.activityForm.valid) {
      let newActivity: Activity = {
        name: this.activityForm.controls['name'].value,
        description: this.activityForm.controls['description'].value,
        location: this.activityForm.controls['location'].value,
        startTime: this.activityForm.controls['timeRange'].value[0],
        endTime: this.activityForm.controls['timeRange'].value[1]
      }
      this.agenda = [...this.agenda, newActivity];
      this.minStartTime = this.activityForm.value.timeRange[1];
      this.activityForm.reset(
        {
          "name": "",
          "description": "",
          "location": "",
          "timeRange": [this.minStartTime, this.minStartTime]
        }
      );
      Object.keys(this.activityForm.controls).forEach(key => {
        this.activityForm.controls[key].setErrors(null) ;
      });

      this.AgendaEventEmitter.emit(this.agenda);
    } else {
      this.dialog.open(InvalidInputDataDialogComponent, {
        data : {
          title: "Invalid input",
          message: "Invalid input data"
        }
      });
    }
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

  private validateTimeRange(): ValidatorFn {
    return (): ValidationErrors | null => {
      if(this.activityForm) {
        return this.activityForm.controls['timeRange'].value[0] && this.activityForm.controls['timeRange'].value[1] ? null : { bothTimesEntered: true };
      }

      return null;
    };
  }
}
