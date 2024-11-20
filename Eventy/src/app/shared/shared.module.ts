import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvalidInputDataDialogComponent} from './invalid-input-data-dialog/invalid-input-data-dialog.component';
import {MaterialModule} from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    InvalidInputDataDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [InvalidInputDataDialogComponent]
})
export class SharedModule { }
