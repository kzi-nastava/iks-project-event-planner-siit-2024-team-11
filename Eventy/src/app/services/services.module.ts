import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditServiceComponent } from './edit-service/edit-service.component';



@NgModule({
  declarations: [
    AddServiceComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class ServicesModule { }
