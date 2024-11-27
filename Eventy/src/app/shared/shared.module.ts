import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvalidInputDataDialogComponent} from './invalid-input-data-dialog/invalid-input-data-dialog.component';
import {MaterialModule} from '../infrastructure/material/material.module';
import { SolutionCategoryInputDialogComponent } from './solution-category-input-dialog/solution-category-input-dialog.component';
import { FormsModule } from '@angular/forms';
import { YesNoInputDialogComponent } from './yes-no-input-dialog/yes-no-input-dialog.component';



@NgModule({
  declarations: [
    InvalidInputDataDialogComponent,
    SolutionCategoryInputDialogComponent,
    YesNoInputDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [InvalidInputDataDialogComponent]
})
export class SharedModule { }
