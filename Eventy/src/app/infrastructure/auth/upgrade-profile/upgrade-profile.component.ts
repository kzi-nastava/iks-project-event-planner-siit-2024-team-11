import { Component } from '@angular/core';
import { UserService } from '../../../user-management/user.service';
import { AuthService } from '../auth.service';
import { User } from '../../../user-management/model/users.model';

interface ButtonClasses {
  "role-button" : boolean,
  "not-selected-button" : boolean
}

@Component({
  selector: 'app-upgrade-profile',
  templateUrl: './upgrade-profile.component.html',
  styleUrl: './upgrade-profile.component.css'
})
export class UpgradeProfileComponent {
  currentUser: User = null;

  isOrganizer: boolean = true;
  registerType: boolean = false;

  ///////////////////////////////////////////

  constructor(private userService: UserService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.userService.get(this.authService.getId()).subscribe({
      next: (response: User) => {
        this.currentUser = response;
      }
    });
  }

  setRegisterType(isOrganiser: boolean) : void {
    this.isOrganizer = isOrganiser;
  }

  getOrganizerButtonClasses() : ButtonClasses {
    return {
      "role-button" : true,
      "not-selected-button" : !this.isOrganizer
    }
  }

  getProviderButtonClasses() : ButtonClasses {
    return {
      "role-button" : true,
      "not-selected-button" : this.isOrganizer
    }
  }
}
