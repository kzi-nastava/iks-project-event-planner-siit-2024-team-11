import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from '../model/review.model';

export interface ReviewDetailsData {
  review: Review;
}

@Component({
  selector: 'app-review-details-dialog',
  templateUrl: './review-details-dialog.component.html',
  styleUrl: './review-details-dialog.component.css'
})
export class ReviewDetailsDialogComponent {
 constructor(
    private dialogRef: MatDialogRef<ReviewDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewDetailsData
  ) {}

  cancel() {
    this.dialogRef.close(false);
  }
}
