import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { ServiceCardComponent } from './service-card/service-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { MatCardModule } from '@angular/material/card';
import { MyServicesViewComponent } from './my-services-view/my-services-view.component';
import { MyServicesViewCardComponent } from './my-services-view-card/my-services-view-card.component';
import { RouterModule } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { EventsModule } from '../events/events.module';
import { ReservationSelectDatetimeComponent } from './reservation-select-datetime/reservation-select-datetime.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    ServiceCardComponent,
    AddServiceComponent,
    EditServiceComponent,
    MyServicesViewComponent,
    MyServicesViewCardComponent,
    CreateReservationComponent,
    ReservationSelectDatetimeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule,
    EventsModule,
    NgxMatTimepickerModule
  ],
  exports: [
    ServiceCardComponent,
    AddServiceComponent,
    EditServiceComponent,
    CreateReservationComponent
  ],
})
export class ServicesModule { }
