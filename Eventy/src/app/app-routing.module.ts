import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import {LoginComponent} from './infrastructure/auth/login/login.component';
import {RegisterComponent} from './infrastructure/auth/register/register.component';
import {EventOrganizationComponent} from './events/event-organization/event-organization.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import {AllEventTypesComponent} from './events/all-event-types/all-event-types.component';
import {CreateEventTypeComponent} from './events/create-event-type/create-event-type.component';
import {EditEventTypeComponent} from './events/edit-event-type/edit-event-type.component';
import { EditServiceComponent } from './services/edit-service/edit-service.component';
import { MyServicesViewComponent } from './services/my-services-view/my-services-view.component';
import { SolutionCategoryManagementComponent } from './solutions/solution-category-management/solution-category-management.component';
import {
  OtherUserProfilePageComponent
} from './user-management/other-user-profile-page/other-user-profile-page.component';
import {EditUserComponent} from './user-management/edit-user/edit-user.component';
import {MyProfilePageComponent} from './user-management/my-profile-page/my-profile-page.component';
import { CreateReservationComponent } from './services/create-reservation/create-reservation.component';
import { FastRegistrationComponent } from './infrastructure/auth/fast-registration/fast-registration.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'organize-event', component: EventOrganizationComponent},
  {path: 'add-service', component: AddServiceComponent},
  {path: 'event-types', component: AllEventTypesComponent},
  {path: 'add-event-types', component: CreateEventTypeComponent},
  {path: 'edit-event-type/:id', component: EditEventTypeComponent},
  {path: 'edit-service/:id', component: EditServiceComponent},
  {path: 'my-services', component: MyServicesViewComponent},
  {path: 'solution-categories', component: SolutionCategoryManagementComponent},
  {path: 'users/:id', component: OtherUserProfilePageComponent},
  {path: 'profile/edit', component: EditUserComponent},
  {path: 'profile', component: MyProfilePageComponent},
  {path: 'create-reservation', component: CreateReservationComponent},
  {path: 'fast-registration', component: FastRegistrationComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
