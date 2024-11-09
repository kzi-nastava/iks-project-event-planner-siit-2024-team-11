import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginBannerComponent } from './login-banner/login-banner.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {MaterialModule} from '../infrastructure/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginBannerComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class UserManagementModule { }
