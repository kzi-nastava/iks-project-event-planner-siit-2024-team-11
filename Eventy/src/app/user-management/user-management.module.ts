import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
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
import { UpgradeProfileComponent } from './upgrade-profile/upgrade-profile.component';
import { UpgradeOrganizerComponent } from './upgrade-organizer/upgrade-organizer.component';
import { UpgradeProviderComponent } from './upgrade-provider/upgrade-provider.component';
import {AuthModule} from '../infrastructure/auth/auth.module';

@NgModule({
  declarations: [
    OtherUserProfilePageComponent,
    EditUserComponent,
    EditUserFormComponent,
    EditProviderFormComponent,
    MyProfilePageComponent,
    UpgradeProfileComponent,
    UpgradeOrganizerComponent,
    UpgradeProviderComponent,
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
    AuthModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class UserManagementModule { }
