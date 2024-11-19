import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import {LoginComponent} from './user-management/login/login.component';
import {RegisterComponent} from './user-management/register/register.component';
import {EventOrganizationComponent} from './events/event-organization/event-organization.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import {AllEventTypesComponent} from './events/all-event-types/all-event-types.component';
import {CreateEventTypeComponent} from './events/create-event-type/create-event-type.component';
import {EditEventTypeComponent} from './events/edit-event-type/edit-event-type.component';
import { EditServiceComponent } from './services/edit-service/edit-service.component';

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
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
