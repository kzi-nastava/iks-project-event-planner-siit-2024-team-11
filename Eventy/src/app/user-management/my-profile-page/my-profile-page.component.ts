import { Component } from '@angular/core';
import {Organizer, Provider} from '../model/users.model';
import {EventCard} from '../../events/model/event-card.model';
import {SolutionCard} from '../../solutions/model/solution-card.model';
import {UserService} from '../user.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.css'
})
export class MyProfilePageComponent {
  user: (Organizer | Provider) = {
    "profilePicture" : null,
    "firstName": "Tac Tac",
    "lastName": "Jezickovic",
    "email": "tactacjezickovic@doe.com",
    "password": "njamnjamjez",
    "address": "Najblizi zbunic za hibernaciju",
    "phoneNumber": "+324 24 232 33"
  };

  myEvents: EventCard[];
  mySolutions: SolutionCard[];

  searchQuery: string;

  constructor(private userService: UserService) {
    this.myEvents = this.userService.getMyEvents();
    this.mySolutions = this.userService.getMySolutions();
  }

  isOtherUser(): boolean {
    return "firstName" in this.user && false;
  }

  isOrganizer(): boolean {
    return "firstName" in this.user && true;
  }

  isProvider(): boolean {
    return "name" in this.user;
  }

  getName(): string {
    if(this.isOrganizer()) {
      this.user = (this.user as Organizer);
      return this.user.firstName + " " + this.user.lastName;
    }

    this.user = (this.user as Provider);
    return this.user.name;
  }

  getDescription(): string {
    if(!this.isOrganizer()) {
      this.user = (this.user as Provider);
      return this.user.description;
    }

    return "";
  }

  getOrganizerProfilePicture(): string {
    if(this.isOrganizer()) {
      this.user = (this.user as Organizer);
      if(this.user.profilePicture) {
        return this.user.profilePicture;
      }

      return "ProfilePicture.png";
    }

    return "";
  }

  pictureIndex: number = 0;

  getProviderProfilePictures(): string[] {
    if(!this.isOrganizer()) {
      this.user = (this.user as Provider);
      if(this.user.profilePictures && this.user.profilePictures.length > 0) {
        return this.user.profilePictures;
      }

      return ["ProfilePicture.png"];
    }

    return [];
  }

  nextPicture() : void {
    if(this.pictureIndex < this.getProviderProfilePictures().length - 1) {
      this.pictureIndex++;
    }
  }

  previousPicture() : void {
    if(this.pictureIndex > 0) {
      this.pictureIndex--;
    }
  }

  isService(solutionCard: SolutionCard): boolean {
    return (solutionCard.product === undefined);
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.service === undefined);
  }

  search(): void {
    // search
    this.searchQuery = "";
  }

  pageSize: number = 12;
  currentPage: number = 0;

  getPaginatorItemsLength(): number {
    return this.isOrganizer() ? this.myEvents.length : this.mySolutions.length;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedEventTypes();
  }

  private updatePaginatedEventTypes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // service call
  }
}
