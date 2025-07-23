import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { DatepickerModule } from '../infrastructure/datepicker/datepicker.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterModule } from '@angular/router';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ReviewService } from './service/review.service';
import { SharedModule } from '../shared/shared.module';
import { PendingReviewsComponent } from './pending-reviews/pending-reviews.component';
import { ReviewDetailsDialogComponent } from './review-details-dialog/review-details-dialog.component';
import { ReviewCardComponent } from './review-card/review-card.component';


@NgModule({
  declarations: [
    CreateReviewComponent,
    PendingReviewsComponent,
    ReviewDetailsDialogComponent,
    ReviewCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule,
  ],
  exports: [
    CreateReviewComponent,
    ReviewCardComponent
  ],
  providers: [
    ReviewService,
    RouterLink,
    FormsModule,
    SharedModule
  ]
})
export class ReviewsModule { }
