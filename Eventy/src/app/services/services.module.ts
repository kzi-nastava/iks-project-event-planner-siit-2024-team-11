import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { ServiceCardComponent } from './service-card/service-card.component';



@NgModule({
  declarations: [
    ServiceCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule
  ],
  exports: [
    ServiceCardComponent,
  ]
})
export class ServicesModule { }
