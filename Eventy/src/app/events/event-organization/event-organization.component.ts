import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {EventsServiceService} from '../services/events/events-service.service';
import {Activity, EventBasicInformation, OrganizeEvent} from '../model/events.model';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '../model/location.model';
import {AuthService} from '../../infrastructure/auth/auth.service';

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
   invitedEmails: string[] = [];
   agenda: Activity[] = [];
   basicInformation: EventBasicInformation;

   constructor(private router: Router, private eventsService: EventsServiceService,
               private dialog : MatDialog, private authService: AuthService) {
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

    collectInvitedEmails(emails: string[]): void {
      this.invitedEmails = emails;
    }

    collectAgenda(activites: Activity[]): void {
      this.agenda = activites;
    }

    collectBasicInformation(basicInformation: EventBasicInformation): void {
      this.basicInformation = basicInformation;
    }

    submit(): void {
     let event: OrganizeEvent = {
       name: this.basicInformation.name,
       description: this.basicInformation.description,
       maxNumberParticipants: this.basicInformation.maxNumberParticipants,
       isPublic: this.basicInformation.isPublic,
       eventTypeId: this.basicInformation.eventTypeId,
       createLocationDTO: this.basicInformation.createLocationDTO,
       date: this.basicInformation.date,
       agenda: this.agenda,
       emails: this.invitedEmails,
       organizerId: this.authService.getId()
     };

     this.eventsService.organizeEvent(event).subscribe({
       next: (response) => {
         this.router.navigate(['']);
       },
       error: (error: Error) => {
         this.dialog.open(ErrorDialogComponent, {
           width: '400px',
           disableClose: true, // prevents closing by clicking outside
           backdropClass: 'blurred_backdrop_dialog',
           data: {
             title: 'Input Error',
             message: 'Please make sure that all inputs are valid.',
           },
         });
       }
     });
    }
}
