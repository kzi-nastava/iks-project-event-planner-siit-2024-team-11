import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';



@NgModule({
  declarations: [
    ConfirmRegistrationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class AuthModule { }
