import {Component} from '@angular/core';
import {EventCard} from '../../events/model/event-card.model';
import {SolutionCard} from '../../solutions/model/solution-card.model';
import {UserService} from '../user.service';
import {PageEvent} from '@angular/material/paginator';
import {CalendarEvent} from 'angular-calendar';
import {User} from '../model/users.model';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.css'
})
export class MyProfilePageComponent {
  user: User;

  myEvents: EventCard[];
  mySolutions: SolutionCard[];

  calendarEvents: CalendarEvent[];

  searchMyEventsSolutions: string;
  searchMyFavEvents: string;
  searchMyFavSolutions: string;

  constructor(private userService: UserService, private authService: AuthService) {
    this.myEvents = this.userService.getMyEvents();
    this.mySolutions = this.userService.getMySolutions();

    this.userService.get(this.authService.getId()).subscribe({
      next: (result: User) => {
        this.user = result;
      }
    });
    // will create calendarEvents from events and solutions, but for now...
    this.calendarEvents = [
      {
        id: 1,
        start: new Date(),
        end: new Date(),
        title: 'Today’s Event',
        color: {
          primary: "#808AAC",
          secondary: "#bfc4d5"
        }
      },
      {
        id: 2,
        start: new Date(new Date().setDate(new Date().getDate() + 2)),
        end: new Date(new Date().setDate(new Date().getDate() + 4)),
        title: 'Event in Two Days Product',
        color: {
          primary: "#FAD609",
          secondary: "#fdee9c"
        }
      },
      {
        id: 3,
        start: new Date(new Date().setDate(new Date().getDate() + 10)),
        end: new Date(new Date().setDate(new Date().getDate() + 10)),
        title: 'Last Event Service',
        color: {
          primary: "#DD79AE",
          secondary: "#f4d6e6"
        }
      },
    ];
  }

  isOtherUser(): boolean {
    return "firstName" in this.user && false;
  }

  isOrganizer(): boolean {
    return "firstName" in this.user && true;
  }

  isProvider(): boolean {
    return this.user.name != null;
  }

  getName(): string {
    if(this.isOrganizer()) {
      return this.user.firstName + " " + this.user.lastName;
    }

    return this.user.name;
  }

  getDescription(): string {
    if(!this.isOrganizer()) {
      return this.user.description;
    }

    return "";
  }

  getUserProfilePicture(): string {
    if(this.isOrganizer() || this.isOtherUser()) {
      if(this.user.profilePictures) {
        return this.user.profilePictures[0];
      }

      return "ProfilePicture.png";
    }

    return "";
  }

  pictureIndex: number = 0;

  getProviderProfilePictures(): string[] {
    if(!this.isOrganizer()) {
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

  searchMyStuff(): void {
    // search
    this.searchMyEventsSolutions = "";
  }

  searchFavEvents(): void {
    // search
    this.searchMyFavEvents = "";
  }

  searchFavSolutions(): void {
    this.searchMyFavSolutions = "";
  }

  pageSize: number = 3;
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

  viewDate: Date = new Date();

  dayClicked({ day }: { day: any }): void {
    const { date, events } = day;
    if (events.length > 0) {
      alert(date);
      // navigate to the event details page here
    }
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }
}
