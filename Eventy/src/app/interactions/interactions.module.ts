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
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntlService } from './services/paginator/custom-mat-paginator-intl.service';
import { NotificationCardComponent } from './notification-card/notification-card.component';


@NgModule({
  declarations: [
    AllNotificationsComponent,
    NotificationCardComponent
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
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService }
  ]
})
export class InteractionsModule { }
