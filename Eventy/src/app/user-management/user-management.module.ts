import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginBannerComponent } from './login-banner/login-banner.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {MaterialModule} from '../infrastructure/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { RegisterBannerComponent } from './register-banner/register-banner.component';
import { RegisterOrganizerComponent } from './register-organizer/register-organizer.component';
import { RegisterProviderComponent } from './register-provider/register-provider.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginBannerComponent,
    LoginFormComponent,
    RegisterBannerComponent,
    RegisterOrganizerComponent,
    RegisterProviderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserManagementModule { }
