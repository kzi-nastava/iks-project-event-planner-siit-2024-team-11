import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { EventOrganizationComponent } from './event-organization/event-organization.component';
import { EventCreationBasicInformationComponent } from './event-creation-basic-information/event-creation-basic-information.component';
import { AgendaCreationComponent } from './agenda-creation/agenda-creation.component';
import { InvitationsSendingComponent } from './invitations-sending/invitations-sending.component';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { EventCardComponent } from './event-card/event-card.component';
import { FeaturedEventsComponent } from './featured-events/featured-events.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { AllEventsComponent } from './all-events/all-events.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    EventOrganizationComponent,
    EventCreationBasicInformationComponent,
    AgendaCreationComponent,
    InvitationsSendingComponent,
    EventCardComponent,
    FeaturedEventsComponent,
    EventFiltersComponent,
    AllEventsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  exports: [
    EventCardComponent,
    FeaturedEventsComponent,
    EventFiltersComponent,
    AllEventsComponent,
  ]
})
export class EventsModule { }
