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
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';


@NgModule({
  declarations: [
    AllNotificationsComponent
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
    AllNotificationsComponent,
  ],
  providers: [
    RouterLink,
    FormsModule,
  ]
})
export class InteractionsModule { }
