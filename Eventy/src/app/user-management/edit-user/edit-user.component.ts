import { Component } from '@angular/core';
import {User} from '../model/users.model';
import {UserService} from '../user.service';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user: User;

  constructor(private userService: UserService, private authService: AuthService) {
    this.userService.get(this.authService.getId()).subscribe({
      next: (result: User) => {
        this.user = result;
      }
    });
  }

  isProvider(): boolean {
    return this.user.name != null;
  }

  getUserOrganizer(): User {
    return this.user;
  }

  getUserProvider(): User {
    return this.user;
  }
}
