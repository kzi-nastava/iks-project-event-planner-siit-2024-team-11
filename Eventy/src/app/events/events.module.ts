import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { EventOrganizationComponent } from './event-organization/event-organization.component';
import { EventCreationBasicInformationComponent } from './event-creation-basic-information/event-creation-basic-information.component';
import { AgendaCreationComponent } from './agenda-creation/agenda-creation.component';
import { InvitationsSendingComponent } from './invitations-sending/invitations-sending.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { EventCardComponent } from './event-card/event-card.component';
import { FeaturedEventsComponent } from './featured-events/featured-events.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';



@NgModule({
  declarations: [
    EventOrganizationComponent,
    EventCreationBasicInformationComponent,
    AgendaCreationComponent,
    InvitationsSendingComponent,
    EventCardComponent,
    FeaturedEventsComponent,
    EventFiltersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule
  ],
  exports: [
    EventCardComponent,
    FeaturedEventsComponent,
    EventFiltersComponent,
  ]
})
export class EventsModule { }
