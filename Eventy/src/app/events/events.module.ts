import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EventOrganizationComponent } from './event-organization/event-organization.component';
import { EventCreationBasicInformationComponent } from './event-creation-basic-information/event-creation-basic-information.component';
import { AgendaCreationComponent } from './agenda-creation/agenda-creation.component';
import { InvitationsSendingComponent } from './invitations-sending/invitations-sending.component';
import { DatepickerModule } from '../infrastructure/datepicker/datepicker.module';
import { EventCardComponent } from './event-card/event-card.component';
import { FeaturedEventsComponent } from './featured-events/featured-events.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventsService } from './services/events/events-service.service';
import { AllEventTypesComponent } from './all-event-types/all-event-types.component';
import { CreateEventTypeComponent } from './create-event-type/create-event-type.component';
import { EditEventTypeComponent } from './edit-event-type/edit-event-type.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReservationSelectEventComponent } from './reservation-select-event/reservation-select-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventStatsComponent } from './event-stats/event-stats.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { OwnEventsDialogComponent } from './own-events-dialog/own-events-dialog.component';

@NgModule({
  declarations: [
    EventOrganizationComponent,
    EventCreationBasicInformationComponent,
    AgendaCreationComponent,
    InvitationsSendingComponent,
    EventCardComponent,
    FeaturedEventsComponent,
    EventFiltersComponent,
    AllEventsComponent,
    AllEventTypesComponent,
    CreateEventTypeComponent,
    EditEventTypeComponent,
    ReservationSelectEventComponent,
    EventDetailsComponent,
    EventStatsComponent,
    OwnEventsDialogComponent
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
    RouterModule,
    NgxChartsModule,
  ],
  exports: [
    EventCardComponent,
    FeaturedEventsComponent,
    EventFiltersComponent,
    AllEventsComponent,
    ReservationSelectEventComponent
  ],
  providers: [
    EventsService,
    RouterLink,
    FormsModule,
    SharedModule
  ]
})
export class EventsModule { }
