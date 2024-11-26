import {Component} from '@angular/core';
import {Organizer, Provider} from '../model/users.model';

@Component({
  selector: 'app-other-user-profile-page',
  templateUrl: './other-user-profile-page.component.html',
  styleUrl: './other-user-profile-page.component.css'
})
export class OtherUserProfilePageComponent {
  user: (Organizer | Provider) = {
    "profilePicture" : null,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@doe.com",
    "password": "123456",
    "address": "asdkm",
    "phoneNumber": "+324 24232331"
  };

  isOrganizer(): boolean {
    return "firstName" in this.user;
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
      if(this.user.profilePictures.length > 0) {
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
}
