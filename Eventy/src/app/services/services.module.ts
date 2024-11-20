import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { MatCardModule } from '@angular/material/card';
import { MyServicesViewComponent } from './my-services-view/my-services-view.component';
import { MyServicesViewCardComponent } from './my-services-view-card/my-services-view-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddServiceComponent,
    EditServiceComponent,
    MyServicesViewComponent,
    MyServicesViewCardComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule
  ]
})
export class ServicesModule { }
