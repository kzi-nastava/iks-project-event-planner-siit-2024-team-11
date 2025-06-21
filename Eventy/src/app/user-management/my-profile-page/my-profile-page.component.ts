import {Component} from '@angular/core';
import {EventCard} from '../../events/model/event-card.model';
import {SolutionCard} from '../../solutions/model/solution-card.model';
import {UserService} from '../user.service';
import {PageEvent} from '@angular/material/paginator';
import {CalendarEvent} from 'angular-calendar';
import {CalendarOccupancy, User} from '../model/users.model';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {Router} from '@angular/router';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';

interface ColorScheme {
  primary: string;
  secondary: string;
}

interface CalendarColors {
  EVENT: ColorScheme;
  PRODUCT: ColorScheme;
  SERVICE: ColorScheme;
}

const calendarColors: CalendarColors = {
  "EVENT": {
    primary: "#808AAC",
    secondary: "#bfc4d5"
  },
  "PRODUCT": {
    primary: "#DD79AE",
    secondary: "#f4d6e6"
  },
  "SERVICE": {
    primary: "#FAD609",
    secondary: "#fdee9c"
  }
}

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.css'
})
export class MyProfilePageComponent {
  user: User;

  myEvents: EventCard[] = [];
  mySolutions: SolutionCard[] = [];
  favEvents: EventCard[] = [];
  favSolutions: SolutionCard[] = [];

  calendarEvents: CalendarEvent[] = [];

  searchMyEventsSolutions: string;
  searchMyFavEvents: string;
  searchMyFavSolutions: string;

  constructor(private userService: UserService, private authService: AuthService, private router: Router,
              private dialog: MatDialog) {
    this.userService.get(this.authService.getId()).subscribe({
      next: (result: User) => {
        this.user = result;

        this.fetchMyEventsSolutions();
        this.fetchFavEvents();
        this.fetchFavSolutions();
      }
    });

    this.fetchCalendarOccupancies();
  }

  isOtherUser(): boolean {
    return this.user.firstName != null && this.user.userType !== "ORGANIZER";
  }

  isOrganizer(): boolean {
    return this.user.userType === "ORGANIZER";
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
    return (solutionCard.type === "SERVICE");
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.type === "PRODUCT");
  }

  myEventsSolutionsPageSize: number = 3;
  myEventsSolutionsCurrentPage: number = 0;
  myEventsSolutionsTotalCount: number = 0;

  searchMyStuff(): void {
    this.myEventsSolutionsCurrentPage = 0;
    this.fetchMyEventsSolutions();
    this.searchMyEventsSolutions = "";
  }

  onMyEventsSolutionsPageChange(event: PageEvent): void {
    this.myEventsSolutionsPageSize = event.pageSize;
    this.myEventsSolutionsCurrentPage = event.pageIndex;
    this.fetchMyEventsSolutions();
  }

  private fetchMyEventsSolutions(): void {
    if (this.user.userType === "ORGANIZER") {
      this.userService.getMyEvents(this.user.id, this.searchMyEventsSolutions, {
        page: this.myEventsSolutionsCurrentPage,
        size: this.myEventsSolutionsPageSize,
      }).subscribe({
        next: (result: PagedResponse<EventCard>) => {
          this.myEvents = result.content;
          this.myEventsSolutionsTotalCount = result.totalElements;
        }
      });
    }
    else if(this.user.userType === "PROVIDER") {
      this.userService.getMySolutions(this.user.id, this.searchMyEventsSolutions, {
        page: this.myEventsSolutionsCurrentPage,
        size: this.myEventsSolutionsPageSize,
      }).subscribe({
        next: (result: PagedResponse<SolutionCard>) => {
          this.mySolutions = result.content;
          this.myEventsSolutionsTotalCount = result.totalElements;
        }
      });
    }
  }

  favEventsPageSize: number = 3;
  favEventsCurrentPage: number = 0;
  favEventsTotalCount: number = 0;

  searchFavEvents(): void {
    this.favEventsCurrentPage = 0;
    this.fetchFavEvents();
    this.searchMyFavEvents = "";
  }

  onFavEventsPageChange(event: PageEvent): void {
    this.favEventsPageSize = event.pageSize;
    this.favEventsCurrentPage = event.pageIndex;
    this.fetchFavEvents();
  }

  private fetchFavEvents(): void {
    this.userService.getMyFavoriteEvents(this.user.id, this.searchMyFavEvents, {
      page: this.favEventsCurrentPage,
      size: this.favEventsPageSize
    }).subscribe({
      next: (result: PagedResponse<EventCard>) => {
        this.favEvents = result.content;
        this.favEventsTotalCount = result.totalElements;
      }
    });
  }

  favSolutionsPageSize: number = 3;
  favSolutionsCurrentPage: number = 0;
  favSolutionsTotalCount: number = 0;

  searchFavSolutions(): void {
    this.favSolutionsCurrentPage = 0;
    this.fetchFavSolutions();
    this.searchMyFavSolutions = "";
  }

  onFavSolutionsPageChange(event: PageEvent): void {
    this.favSolutionsPageSize = event.pageSize;
    this.favSolutionsCurrentPage = event.pageIndex;
    this.fetchFavSolutions();
  }

  private fetchFavSolutions(): void {
    this.userService.getMyFavoriteSolutions(this.user.id, this.searchMyFavSolutions, {
      page: this.favSolutionsCurrentPage,
      size: this.favSolutionsPageSize
    }).subscribe({
      next: (result: PagedResponse<SolutionCard>) => {
        this.favSolutions = result.content;
        this.favSolutionsTotalCount = result.totalElements;
      }
    });
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
    this.fetchCalendarOccupancies();
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
    this.fetchCalendarOccupancies();
  }

  fetchCalendarOccupancies(): void {
    let [startDate, endDate] = this.calculateFirstAndLastDates();

    this.userService.getMyCalendar(this.authService.getId(), startDate, endDate).subscribe({
      next: (resultOccupancies: CalendarOccupancy[]) => {
        this.calendarEvents = [];

        resultOccupancies.forEach(occupancy => {
          this.calendarEvents.push({
            id: occupancy.id,
            start: new Date(occupancy.occupationStartDate),
            end: new Date(occupancy.occupationEndDate),
            title: occupancy.title,
            color: calendarColors[occupancy.occupancyType]
          })
        });

        this.calendarEvents = [...this.calendarEvents];
      }
    });
  }

  private calculateFirstAndLastDates(): [Date, Date] {
    const startOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const startDayOfWeek = startOfMonth.getDay();
    const firstDate = new Date(startOfMonth);
    firstDate.setDate(firstDate.getDate() - startDayOfWeek);

    const endOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    const endDayOfWeek = endOfMonth.getDay();
    const lastDate = new Date(endOfMonth);
    lastDate.setDate(lastDate.getDate() + (6 - endDayOfWeek));

    return [firstDate, lastDate];
  }

  deactivate(): void {
    this.userService.deactivate(this.authService.getId()).subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Deactivation not permitted',
            message: `You are not permitted do deactivate this account while you still have ${this.user.userType === "ORGANIZER" ? "organized events" : "reserved solutions"}.`,
          },
        });
      }
    });
  }
}
