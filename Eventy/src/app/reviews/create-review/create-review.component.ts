import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateReview } from '../model/review.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { ReviewService } from '../service/review.service';

export interface ReviewDialogData {
  title: string;
  message: string;
  createReview: CreateReview
}

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {
  grade: number = 1;
  reviewForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewDialogData,
    private dialog: MatDialog,
    private reviewService: ReviewService,
  ) {
    this.reviewForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.reviewForm.patchValue({
      message: "",
    });
  }

  confirmReview() {
    if(this.reviewForm.invalid) {
      this.reviewForm.updateValueAndValidity();
      this.reviewForm.markAllAsTouched();

    } else {
      let message = this.reviewForm.controls['message'].value;

      this.data.createReview.comment = message;
      this.data.createReview.grade = this.grade;
      
      this.reviewService.createReview(this.data.createReview).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          this.dialog.open(ErrorDialogComponent, {
            data : {
              title: "Error!",
              message: "Error while creating a review!"
            }
          });
        }
      });

      
    }
  }

  changeGrade(grade: number) {
    this.grade = grade;
  }

  resetValue(targetField: string): void {
    if(this.reviewForm.controls.hasOwnProperty(targetField)) {
      let fieldsWithoutErrors: string[] = [];

      for(let field in this.reviewForm.controls) {
        if(field !== targetField && !this.reviewForm.controls[field].touched) {
          fieldsWithoutErrors.push(field);
        }
      }

      this.reviewForm.controls[targetField].setValue('');

      for(let field of fieldsWithoutErrors) {
        this.reviewForm.controls[field].setErrors(null);
      }
    }
  }
}
