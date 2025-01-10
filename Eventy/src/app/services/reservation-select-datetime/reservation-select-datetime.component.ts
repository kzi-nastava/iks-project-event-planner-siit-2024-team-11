import { Component, Input, OnInit } from '@angular/core';
import { EventCard } from '../../events/model/event-card.model';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { YesNoFancierDialogComponent } from '../../shared/yes-no-fancier-dialog/yes-no-fancier-dialog.component';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';

@Component({
  selector: 'app-reservation-select-datetime',
  templateUrl: './reservation-select-datetime.component.html',
  styleUrl: './reservation-select-datetime.component.css',
  providers: [provideNativeDateAdapter()]
})
export class ReservationSelectDatetimeComponent {
  @Input() selectedEvent: EventCard;

  selectedService: SolutionCard;

  // date
  dateControl: FormControl;
  reservedDates = ['2024-12-15', '2024-12-20']; // Mock reserved dates
  selectedDate: Date;
  // time
  startTimeControl: FormControl;
  endTimeControl: FormControl;
  reservedSlots = [   // mock data
    { start: '2024-12-15T10:00', end: '2024-12-15T12:00' },
    { start: '2024-12-20T15:00', end: '2024-12-20T16:30' },
  ];
  isFixedDuration = false;
  selectedStartTime: Date | null = null;
  selectedEndTime: Date | null = null;
  confirmReservationClickedStage: Number = 0;

  constructor(private solutionsService: SolutionsService, private dialog: MatDialog) {
    this.dateControl = new FormControl('', [
      Validators.required,
      this.dateValidator(),
    ]);
  
    this.startTimeControl = new FormControl('', [
      Validators.required,
      this.startTimeValidator(),
    ]);
    this.endTimeControl = new FormControl('');
  
    // Add a subscription for endTimeControl changes
    this.endTimeControl.valueChanges.subscribe(() => {
      this.startTimeControl.updateValueAndValidity();
    });
  }

  ngOnInit() {
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo({top: 0, behavior: 'smooth'}); // smooth scrolling

    // Fetch the selected service and initialize related properties
    this.solutionsService.getSolution(1).subscribe((service) => {
      this.selectedService = service;

      // Update dependent properties
      this.isFixedDuration = this.selectedService.minReservationTime === this.selectedService.maxReservationTime;

      // Update validation for endTimeControl based on fetched service
      this.endTimeControl.setValidators(
        this.isFixedDuration ? [] : [Validators.required, this.endTimeValidator()]
      );
      this.endTimeControl.updateValueAndValidity();
    });
  } 

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      const tooEarlyDate = new Date(today);
      tooEarlyDate.setDate(today.getDate() + this.selectedService.reservationDeadline);

      // Check if the selected date is too early
      if (selectedDate < tooEarlyDate) {
        return { tooEarly: true };
      }

      // Check if the selected date is already reserved
      /*if (this.reservedDates.includes(selectedDate.toISOString().split('T')[0])) {
        return { alreadyReserved: true };
      }*/

      this.selectedDate = selectedDate;
      return null; // Valid date
    };
  }

  isDateValid() {
    return this.dateControl.valid;
  }

  startTimeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let startTimeDate: Date = this.parseTimeString(control.value);  
      this.selectedStartTime = startTimeDate;
      
      if (this.selectedStartTime != null && this.selectedEndTime != null && this.selectedEndTime <= this.selectedStartTime) {
        return { invalidTime: true };
      }

      if (this.selectedStartTime != null && this.selectedEndTime != null) {
        const duration = (this.selectedEndTime.getTime() - this.selectedStartTime.getTime()) / 60000; // Minutes
        
        if (duration > this.selectedService.maxReservationTime) {
          return { durationTooLong: true };
        }
        else if (duration < this.selectedService.minReservationTime) {
          return { durationTooShort: true };
        }
      }
      
      /*if (this.isOverlapping(startTime, this.endTimeControl.value)) {
        return { invalidStartTime: true };
      }*/
      return null;
    };
  }

  endTimeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let endTimeDate: Date = this.parseTimeString(control.value);  
      this.selectedEndTime = endTimeDate;

      if (this.selectedStartTime != null && this.selectedEndTime != null && this.selectedEndTime <= this.selectedStartTime) {
        return { invalidTime: true };
      }

      if (this.selectedStartTime != null && this.selectedEndTime != null) {
        const duration = (this.selectedEndTime.getTime() - this.selectedStartTime.getTime()) / 60000; // Minutes
        if (duration > this.selectedService.maxReservationTime) {
          return { durationTooLong: true };
        }
        else if (duration < this.selectedService.minReservationTime) {
          return { durationTooShort: true };
        }
      }

      /*if (this.isOverlapping(startTime, endTime)) {
        return { invalidEndTime: true };
      }*/

      return null;
    };
  }

  parseTimeString(timeString: String) : Date {
    if (timeString === "") { 
      return null;
    }
    const date = new Date();
    const timeParts = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i);

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const period = timeParts[3].toUpperCase();

    if (period === "PM" && hours < 12) {
        hours += 12;
    } else if (period === "AM" && hours === 12) {
        hours = 0;
    }
    date.setHours(hours, minutes, 0, 0);

    return date;
  }

  
  isOverlapping(startTime: Date, endTime: Date | null): boolean {
    return this.reservedSlots.some(
      (slot) =>
        new Date(slot.start) < endTime && new Date(slot.end) > startTime
    );
  }

  isTimeValid() {
    return this.startTimeControl.valid && this.endTimeControl.valid;
  }

  onContinueButtonClicked() {
    this.dateControl.markAsTouched();
    this.startTimeControl.markAsTouched();
    this.endTimeControl.markAsTouched();

    if (this.isDateValid() && this.isTimeValid()) {
      this.confirmReservationClickedStage = 1;

      const element = document.querySelector('mat-sidenav-content') || window;
      element.scrollTo({top: 0, behavior: 'smooth'}); // smooth scrolling

      const dialogRef = this.dialog.open(YesNoFancierDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Confirm Reservation', 
          message: 'Are you sure you want to proceed with creating the reservation?',
        },
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.confirmReservationClickedStage = 2;
        } else {
          this.confirmReservationClickedStage = 0;
        }
      });
    } else {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // Prevent closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Invalid data', // Pass the title
          message: 'Please make sure that all inputs are valid before confirming the reservation.', // Pass the message
        },
      });
    }
  }
}
