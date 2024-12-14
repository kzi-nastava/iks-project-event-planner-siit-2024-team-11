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
import { OtherUserProfilePageComponent } from './other-user-profile-page/other-user-profile-page.component';
import {EventsModule} from "../events/events.module";
import {ProductsModule} from '../products/products.module';
import {ServicesModule} from '../services/services.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { EditProviderFormComponent } from './edit-provider-form/edit-provider-form.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { FastRegistrationComponent } from './fast-registration/fast-registration.component';
import { UpgradeProfileComponent } from './upgrade-profile/upgrade-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginBannerComponent,
    LoginFormComponent,
    RegisterBannerComponent,
    RegisterOrganizerComponent,
    RegisterProviderComponent,
    OtherUserProfilePageComponent,
    EditUserComponent,
    EditUserFormComponent,
    EditProviderFormComponent,
    MyProfilePageComponent,
    FastRegistrationComponent,
    UpgradeProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    SharedModule,
    EventsModule,
    ProductsModule,
    ServicesModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class UserManagementModule { }
