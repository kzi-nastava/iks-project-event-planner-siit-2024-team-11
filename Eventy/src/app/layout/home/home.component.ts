import { Component } from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { EventsService } from '../../events/services/events/events-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateReviewComponent } from '../../reviews/create-review/create-review.component';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { CreateReview } from '../../reviews/model/review.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isEventsSelected : boolean = true;
  currentTab: number = 1;

  filters: any = {}; // To store filters
  searchQuery: string = ''; // To store search input

  ///////////////////////////////////////////////////////

  constructor(private authService: AuthService,
              private eventService: EventsService,
              private dialog: MatDialog) {}

  ngOnInit() {
    if (localStorage.getItem('runHandleReviewEvents') === 'true') {
      localStorage.removeItem('runHandleReviewEvents');
      this.handleReviewEvents();
    } 
  }

  private handleReviewEvents() {
    let loggedInUserId = this.authService.getId();
    
    this.eventService.getUnreviewedAcceptedEventsByUserId(loggedInUserId).subscribe({
      next: (unreviewedEvents) => {
        let index = 0;

        const showNextDialog = () => {
          if (index >= unreviewedEvents.length) {
            window.location.reload();
            return;
          }

          const event = unreviewedEvents[index];

          let createReview: CreateReview = {
            graderId: loggedInUserId,
            solutionId: null,
            eventId: event.id,
            grade: null,
            comment: null
          }

          const dialogRef = this.dialog.open(CreateReviewComponent, {
            disableClose: true, // Prevent closing by clicking outside
            data: {
              title: `"${event.name}"`,
              message: `Please rate the event you attended!`,
              createReview: createReview
            }
          });

          index++;

          dialogRef.afterClosed().subscribe(() => {
            showNextDialog(); 
          });
        };

        if (unreviewedEvents.length > 0) {
          showNextDialog();
        } else {
          window.location.reload();
        }
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Error!",
            message: "Error while loading unreviewed events"
          }
        });
      }
    });
  }

  switchTab(tab: number) : void { 
    if (this.currentTab === 1 && tab === 2) {
      this.currentTab = 2;
      this.isEventsSelected = !this.isEventsSelected;
    }

    if (this.currentTab === 2 && tab === 1) {
      this.currentTab = 1;
      this.isEventsSelected = !this.isEventsSelected;
    }
  }

  // Handle when filters are applied
  handleFiltersChanged(filters: any): void {
    this.filters = filters;
  }

  // Handle when filters are reset
  handleFiltersReset(): void {
    this.filters = {}; // Reset filters
  }

  // Handle search input
  handleSearch(searchValue: string): void {
    this.searchQuery = searchValue;
  }
}
  