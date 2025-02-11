import { Component } from '@angular/core';
import { Review } from '../model/review.model';
import { ReviewService } from '../service/review.service';
import { PageEvent } from '@angular/material/paginator';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { ReviewDetailsDialogComponent } from '../review-details-dialog/review-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-pending-reviews',
  templateUrl: './pending-reviews.component.html',
  styleUrl: './pending-reviews.component.css'
})
export class PendingReviewsComponent {
  paginatedPendingReviews: Review[] = [];
  pageEvent: PageEvent;
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;

  constructor(private reviewService: ReviewService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updatePaginatedReviews();
  }

  public onPageChange(event?: PageEvent){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedReviews();
  }

  private updatePaginatedReviews(): void {
    this.reviewService.getAllPendingReviews(
      { page: this.currentPage, size: this.pageSize },
    ).subscribe({
      next: (response: PagedResponse<Review>) => {
        this.paginatedPendingReviews = response.content;
        this.totalCount = response.totalElements;
      },
      error: (err) => {
        console.error('Failed to fetch events:', err);
      },
    });
  }

  public openReviewDetails(review: Review) {
    this.dialog.open(ReviewDetailsDialogComponent, {
      width: '320px',
      backdropClass: 'blurred_backdrop_dialog',
      data: {
        review: review
      },
    });
  }

  public acceptReview(review: Review) {
    this.reviewService.acceptReview(review.id).subscribe({
      next: () => {
        this.updatePaginatedReviews();
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Error',
            message: 'An unexpected error occured while accepting the review.',
          },
        });
      },
    });
  }

  public declineReview(review: Review) {
    this.reviewService.declineReview(review.id).subscribe({
      next: () => {
        this.updatePaginatedReviews();
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Error',
            message: 'An unexpected error occured while declining the review.',
          },
        });
      },
    });
  }
}
