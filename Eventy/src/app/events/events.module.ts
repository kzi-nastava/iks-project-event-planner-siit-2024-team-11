import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { EventOrganizationComponent } from './event-organization/event-organization.component';
import { EventCreationBasicInformationComponent } from './event-creation-basic-information/event-creation-basic-information.component';
import { AgendaCreationComponent } from './agenda-creation/agenda-creation.component';
import { InvitationsSendingComponent } from './invitations-sending/invitations-sending.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    EventOrganizationComponent,
    EventCreationBasicInformationComponent,
    AgendaCreationComponent,
    InvitationsSendingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EventsModule { }
