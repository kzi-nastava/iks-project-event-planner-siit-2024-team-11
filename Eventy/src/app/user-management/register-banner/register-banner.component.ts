import {Component, EventEmitter, Input, Output} from '@angular/core';

interface ButtonClasses {
  "role-button" : boolean,
  "not-selected-button" : boolean
}

@Component({
  selector: 'app-register-banner',
  templateUrl: './register-banner.component.html',
  styleUrl: './register-banner.component.css'
})
export class RegisterBannerComponent {
  @Input() isOrganizer!: boolean;
  @Output() setRegisterType = new EventEmitter<boolean>();

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
