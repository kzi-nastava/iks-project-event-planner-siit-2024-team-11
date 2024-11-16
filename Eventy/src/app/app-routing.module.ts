import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import {LoginComponent} from './user-management/login/login.component';
import {RegisterComponent} from './user-management/register/register.component';
import {EventOrganizationComponent} from './events/event-organization/event-organization.component';
import {AllEventTypesComponent} from './events/all-event-types/all-event-types.component';
import {CreateEventTypeComponent} from './events/create-event-type/create-event-type.component';
import {EventTypePageComponent} from './events/event-type-page/event-type-page.component';
import {EditEventTypeComponent} from './events/edit-event-type/edit-event-type.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'organize-event', component: EventOrganizationComponent},
  {path: 'event-types', component: AllEventTypesComponent},
  {path: 'add-event-types', component: CreateEventTypeComponent},
  {path: 'event-types/:id', component: EventTypePageComponent},
  {path: 'edit-event-type', component: EditEventTypeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
