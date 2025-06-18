import {Component} from '@angular/core';
import {EventCard} from '../../events/model/event-card.model';
import {UserService} from '../user.service';
import {SolutionCard} from '../../solutions/model/solution-card.model';
import {PageEvent} from '@angular/material/paginator';
import {User} from '../model/users.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-other-user-profile-page',
  templateUrl: './other-user-profile-page.component.html',
  styleUrl: './other-user-profile-page.component.css'
})
export class OtherUserProfilePageComponent {
  user: User;

  myEvents: EventCard[];
  mySolutions: SolutionCard[];

  searchQuery: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService,
              private router: Router) {
    let id: number = route.snapshot.params['id'];

    if(id == this.authService.getId()) {
      this.router.navigate(['profile']);
      return;
    }

    this.userService.get(id).subscribe({
      next: (user: User) => {
        this.user = user;
        this.fetchMyEventsSolutions();
      }
    });
  }

  isOrganizer(): boolean {
    return "firstName" in this.user && this.user.firstName != null;
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

  getOrganizerProfilePicture(): string {
    if(this.isOrganizer()) {
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

  search(): void {
    this.currentPage = 0;
    this.fetchMyEventsSolutions();
    this.searchQuery = "";
  }

  pageSize: number = 12;
  currentPage: number = 0;
  totalCount: number = 0;

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchMyEventsSolutions();
  }

  private fetchMyEventsSolutions(): void {
    if(this.user.userType === "ORGANIZER") {
      this.userService.getMyEvents(this.user.id, this.searchQuery, {
        page: this.currentPage,
        size: this.pageSize,
      }).subscribe({
        next: (result: PagedResponse<EventCard>) => {
          this.myEvents = result.content;
          this.totalCount = result.totalElements;
        }
      });
    }
    else if(this.user.userType === "PROVIDER") {
      this.userService.getMySolutions(this.user.id, this.searchQuery, {
        page: this.currentPage,
        size: this.pageSize,
      }).subscribe({
        next: (result: PagedResponse<SolutionCard>) => {
          this.mySolutions = result.content;
          this.totalCount = result.totalElements;
        }
      });
    }
  }
}
