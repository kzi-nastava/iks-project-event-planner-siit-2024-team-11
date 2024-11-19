import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { FeaturedSolutionsComponent } from './featured-solutions/featured-solutions.component';
import { EventsModule } from '../events/events.module';
import { ServicesModule } from "../services/services.module";
import { ProductsModule } from "../products/products.module";
import { SolutionFiltersComponent } from './solution-filters/solution-filters.component';



@NgModule({
  declarations: [
    FeaturedSolutionsComponent,
    SolutionFiltersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    EventsModule,
    ServicesModule,
    ProductsModule
],
  exports: [
    FeaturedSolutionsComponent
  ]
})
export class SolutionsModule { }
