import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { EventOrganizationComponent } from './event-organization/event-organization.component';



@NgModule({
  declarations: [
    EventOrganizationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EventsModule { }
