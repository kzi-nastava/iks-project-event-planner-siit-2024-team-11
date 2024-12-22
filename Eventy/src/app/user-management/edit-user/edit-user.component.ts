import { Component } from '@angular/core';
import {User} from '../model/users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user: User = {
    id: 1,
    userType: "org",
    "profilePictures" : null,
    "firstName": "Tac Tac",
    "lastName": "Jezickovic",
    "email": "tactacjezickovic@doe.com",
    "password": "njamnjamjez",
    "address": "Najblizi zbunic za hibernaciju",
    "phoneNumber": "+324 24 232 33",
    "name" : null,
    "description" : null
  };

  isProvider(): boolean {
    return "name" in this.user;
  }

  getUserOrganizer(): User {
    return this.user;
  }

  getUserProvider(): User {
    return this.user;
  }
}
