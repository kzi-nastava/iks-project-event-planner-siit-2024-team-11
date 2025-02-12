import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventsService } from '../services/events/events-service.service';
import { EventCard } from '../model/event-card.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { PageProperties } from '../../shared/model/page-properties.model';
import { YesNoFancierDialogComponent } from '../../shared/yes-no-fancier-dialog/yes-no-fancier-dialog.component';

@Component({
  selector: 'app-own-events-dialog',
  templateUrl: './own-events-dialog.component.html',
  styleUrl: './own-events-dialog.component.css'
})
export class OwnEventsDialogComponent {
  selectedEventId: number = -1;

  filters: any = {}; // To store filters
  searchQuery: string = ''; // To store search input

  constructor(public dialogRef: MatDialogRef<OwnEventsDialogComponent>, private dialog: MatDialog) { }

  onEventSelected(eventCard: EventCard) {
    this.selectedEventId = eventCard.eventId;
  }

  handleFiltersChanged(filters: any): void {
    this.filters = filters;
  }
  
  handleFiltersReset(): void {
    this.filters = {};
  }
  
  handleSearch(searchValue: string): void {
    this.searchQuery = searchValue;
  }

  confirm(): void {
    const yesNoRef = this.dialog.open(YesNoFancierDialogComponent, {
      width: '400px',
      disableClose: true, // prevents closing by clicking outside
      backdropClass: 'blurred_backdrop_dialog',
      data: {
        title: 'Confirm Purchase', 
        message: 'Are you sure you want to purchase the item for this event?',
      },
    });

    yesNoRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close([true, this.selectedEventId])
      }
    })    
  }

  cancel(): void {
    this.dialogRef.close([false, -1])
  }
}
