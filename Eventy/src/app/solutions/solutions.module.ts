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
import { SolutionsService } from './services/solutions/solutions-service.service';
import { ServicesModule } from '../services/services.module';
import { ProductsModule } from '../products/products.module';
import { FeaturedSolutionsComponent } from './featured-solutions/featured-solutions.component';
import { FormsModule } from '@angular/forms';
import { SolutionCategoryManagementComponent } from './solution-category-management/solution-category-management.component';
import { SolutionCategoriesViewComponent } from './solution-categories-view/solution-categories-view.component';
import { MatCardModule } from '@angular/material/card';
import { SolutionCategoriesViewDualCardComponent } from './solution-categories-view-dual-card/solution-categories-view-dual-card.component';
import { SharedModule } from '../shared/shared.module';
import { SolutionCategoryRequestsViewComponent } from './solution-category-requests-view/solution-category-requests-view.component';
import { SolutionCategoryRequestViewDualCardComponent } from './solution-category-request-view-dual-card/solution-category-request-view-dual-card.component';
import { DeleteRequestDialogComponent } from './delete-request-dialog/delete-request-dialog.component';
import { SolutionDetailsComponent } from './solution-details/solution-details.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PricelistMenuComponent } from './pricelist-menu/pricelist-menu.component';
import { PricelistItemComponent } from './pricelist-item/pricelist-item.component';


@NgModule({
  declarations: [
    SolutionFiltersComponent,
    AllSolutionsComponent,
    FeaturedSolutionsComponent,
    SolutionCategoryManagementComponent,
    SolutionCategoriesViewComponent,
    SolutionCategoriesViewDualCardComponent,
    SolutionCategoryRequestsViewComponent,
    SolutionCategoryRequestViewDualCardComponent,
    DeleteRequestDialogComponent,
    SolutionDetailsComponent,
    PricelistMenuComponent,
    PricelistItemComponent,
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
    MatCardModule,
    SharedModule,
    RouterModule,
    MatIconModule,
],
  exports: [
    SolutionFiltersComponent,
    AllSolutionsComponent,
    FeaturedSolutionsComponent,
  ], 
  providers: [
    SolutionsService,
  ]
})
export class SolutionsModule { }
