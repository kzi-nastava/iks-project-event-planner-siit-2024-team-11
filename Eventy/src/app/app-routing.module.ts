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
import { AuthGuard} from './infrastructure/auth/auth.guard';
import { ConfirmRegistrationComponent} from './infrastructure/auth/confirm-registration/confirm-registration.component';
import { UpgradeProfileComponent} from './infrastructure/auth/upgrade-profile/upgrade-profile.component';
import { EventDetailsComponent} from './events/event-details/event-details.component';
import { EventStatsComponent} from './events/event-stats/event-stats.component';
import { SolutionDetailsComponent } from './solutions/solution-details/solution-details.component';
import { AllChatsViewComponent } from './chat/all-chats-view/all-chats-view.component';
import { PendingReviewsComponent } from './reviews/pending-reviews/pending-reviews.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { PendingReportsComponent } from './user-management/pending-reports/pending-reports.component';
import {EditEventComponent} from './events/edit-event/edit-event.component';
import { PricelistMenuComponent } from './solutions/pricelist-menu/pricelist-menu.component';
import { BudgetMenuComponent } from './events/budget-menu/budget-menu.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard],
    data: {role: []}},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard],
    data: {role: []}},
  {path: 'organize-event', component: EventOrganizationComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Organizer']}},
  {path: 'edit-event/:id', component: EditEventComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Organizer']}},
  {path: 'add-service', component: AddServiceComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider']}},
  {path: 'event-types', component: AllEventTypesComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Admin']}},
  {path: 'add-event-types', component: CreateEventTypeComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Admin']}},
  {path: 'edit-event-type/:id', component: EditEventTypeComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Admin']}},
  {path: 'edit-service/:id', component: EditServiceComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider']}},
  {path: 'my-services', component: MyServicesViewComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider']}},
  {path: 'solution-categories', component: SolutionCategoryManagementComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Admin']}},
  {path: 'users/:id', component: OtherUserProfilePageComponent},
  {path: 'profile/edit', component: EditUserComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider', 'ROLE_Organizer', 'ROLE_AuthenticatedUser', 'ROLE_Admin']}},
  {path: 'profile', component: MyProfilePageComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider', 'ROLE_Organizer', 'ROLE_AuthenticatedUser', 'ROLE_Admin']}},
  {path: 'create-reservation', component: CreateReservationComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Organizer']}},
  {path: 'upgrade-profile', component: UpgradeProfileComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_AuthenticatedUser']}},
  {path: 'fast-registration', component: FastRegistrationComponent, canActivate: [AuthGuard],
    data: {role: []}},
  {path: 'confirm-registration/:requestId', component: ConfirmRegistrationComponent, canActivate: [AuthGuard],
    data: {role: []}},
  {path: 'events/stats', component: EventStatsComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Organizer', 'ROLE_Admin']}},
  {path: 'events/:eventId', component: EventDetailsComponent},
  {path: 'solutions/:solutionId', component: SolutionDetailsComponent},
  {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider']}},
  {path: 'edit-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider']}},
  {path: 'chat', component: AllChatsViewComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Organizer', 'ROLE_AuthenticatedUser', 'ROLE_Admin', 'ROLE_Provider']}},
  {path: 'pending-reviews', component: PendingReviewsComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Admin']}},
  {path: 'pending-reports', component: PendingReportsComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Admin']}},
  {path: 'pricelist', component: PricelistMenuComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Provider']}},
  {path: 'budget/:eventId', component: BudgetMenuComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_Organizer']}},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
