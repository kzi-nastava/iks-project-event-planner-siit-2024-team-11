import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { FeaturedSolutionsComponent } from './featured-solutions/featured-solutions.component';
import { EventsModule } from '../events/events.module';



@NgModule({
  declarations: [
    FeaturedSolutionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    EventsModule
  ],
  exports: [
    FeaturedSolutionsComponent
  ]
})
export class SolutionsModule { }
