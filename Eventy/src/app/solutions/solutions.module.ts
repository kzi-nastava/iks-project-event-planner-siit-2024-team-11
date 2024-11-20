import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { EventsModule } from '../events/events.module';
import { SolutionFiltersComponent } from './solution-filters/solution-filters.component';
import { AllSolutionsComponent } from './all-solutions/all-solutions.component';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SolutionsServiceService } from './services/solutions/solutions-service.service';
import { ServicesModule } from '../services/services.module';
import { ProductsModule } from '../products/products.module';
import { FeaturedSolutionsComponent } from './featured-solutions/featured-solutions.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SolutionFiltersComponent,
    AllSolutionsComponent,
    FeaturedSolutionsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    EventsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatSliderModule,
    MatCheckboxModule,
    ServicesModule,
    ProductsModule,
    FormsModule,
    
],
  exports: [
    SolutionFiltersComponent,
    AllSolutionsComponent,
    FeaturedSolutionsComponent,
  ], 
  providers: [
    SolutionsServiceService,
  ]
})
export class SolutionsModule { }
