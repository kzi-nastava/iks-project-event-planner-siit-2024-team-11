import { Component } from '@angular/core';

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
  isOrganizer: boolean = true;
  registerType: boolean = false;

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
