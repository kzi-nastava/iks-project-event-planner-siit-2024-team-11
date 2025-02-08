import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ReviewDetailsData {
  title: string;
  message: string;
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

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
