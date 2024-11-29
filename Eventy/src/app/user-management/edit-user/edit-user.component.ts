import { Component } from '@angular/core';
import {Organizer, Provider} from '../model/users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user: (Organizer | Provider) = {
    "profilePicture" : null,
    "firstName": "Tac Tac",
    "lastName": "Jezickovic",
    "email": "tactacjezickovic@doe.com",
    "password": "njamnjamjez",
    "address": "Najblizi zbunic za hibernaciju",
    "phoneNumber": "+324 24 232 33"
  };

  isProvider(): boolean {
    return "name" in this.user;
  }

  getUserOrganizer(): Organizer {
    return this.user as Organizer;
  }

  getUserProvider(): Provider {
    return this.user as Provider;
  }
}
