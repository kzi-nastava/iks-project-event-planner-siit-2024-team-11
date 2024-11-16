import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { EventOrganizationComponent } from './event-organization/event-organization.component';
import { EventCreationBasicInformationComponent } from './event-creation-basic-information/event-creation-basic-information.component';
import { AgendaCreationComponent } from './agenda-creation/agenda-creation.component';
import { InvitationsSendingComponent } from './invitations-sending/invitations-sending.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { AllEventTypesComponent } from './all-event-types/all-event-types.component';
import { CreateEventTypeComponent } from './create-event-type/create-event-type.component';
import { EditEventTypeComponent } from './edit-event-type/edit-event-type.component';
import { EventTypePageComponent } from './event-type-page/event-type-page.component';



@NgModule({
  declarations: [
    EventOrganizationComponent,
    EventCreationBasicInformationComponent,
    AgendaCreationComponent,
    InvitationsSendingComponent,
    AllEventTypesComponent,
    CreateEventTypeComponent,
    EditEventTypeComponent,
    EventTypePageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule
  ]
})
export class EventsModule { }
