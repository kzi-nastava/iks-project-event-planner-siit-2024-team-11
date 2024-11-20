import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@danielmoncada/angular-datetime-picker';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class DatepickerModule { }
