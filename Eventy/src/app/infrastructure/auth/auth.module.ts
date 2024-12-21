import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginBannerComponent} from './login-banner/login-banner.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterBannerComponent} from './register-banner/register-banner.component';
import {RegisterOrganizerComponent} from './register-organizer/register-organizer.component';
import {RegisterProviderComponent} from './register-provider/register-provider.component';
import {FastRegistrationComponent} from './fast-registration/fast-registration.component';
import {RouterLink} from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginBannerComponent,
    LoginFormComponent,
    RegisterBannerComponent,
    RegisterOrganizerComponent,
    RegisterProviderComponent,
    ConfirmRegistrationComponent,
    FastRegistrationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    RouterLink
  ]
})
export class AuthModule { }
