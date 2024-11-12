import { Component } from '@angular/core';

enum EventOrganizationStage {
  BASIC_INFORMATION,
  AGENDA_CREATION,
  INVITATIONS_SENDING
}

@Component({
  selector: 'app-event-organization',
  templateUrl: './event-organization.component.html',
  styleUrl: './event-organization.component.css'
})
export class EventOrganizationComponent {
  protected readonly EventOrganizationStage = EventOrganizationStage;

   eventOrganizationStage: EventOrganizationStage;
   isEventPublic: boolean;
   titleMap: Map<EventOrganizationStage, string>;

   constructor() {
     this.titleMap = new Map<EventOrganizationStage, string>();
     this.titleMap.set(EventOrganizationStage.BASIC_INFORMATION, "Organize an Event");
     this.titleMap.set(EventOrganizationStage.AGENDA_CREATION, "Add Agenda to the Event");
     this.titleMap.set(EventOrganizationStage.INVITATIONS_SENDING, "Send Invitations");
     this.eventOrganizationStage = EventOrganizationStage.BASIC_INFORMATION;
     this.isEventPublic = true;
   }

    goBack(): void {
      if(this.eventOrganizationStage === EventOrganizationStage.AGENDA_CREATION) {
        this.eventOrganizationStage = EventOrganizationStage.BASIC_INFORMATION;
      } else if(this.eventOrganizationStage === EventOrganizationStage.INVITATIONS_SENDING) {
        this.eventOrganizationStage = EventOrganizationStage.AGENDA_CREATION;
      }
    }

    isForward(): boolean {
     return this.eventOrganizationStage === EventOrganizationStage.BASIC_INFORMATION ||
       (this.eventOrganizationStage === EventOrganizationStage.AGENDA_CREATION && this.isEventPublic);
    }

    goForward(): void {
      if(this.eventOrganizationStage === EventOrganizationStage.BASIC_INFORMATION) {
        this.eventOrganizationStage = EventOrganizationStage.AGENDA_CREATION;
      } else if(this.eventOrganizationStage === EventOrganizationStage.AGENDA_CREATION) {
        this.eventOrganizationStage = EventOrganizationStage.INVITATIONS_SENDING;
      }
    }

    submit(): void {
     alert("DONE");
    }
}
