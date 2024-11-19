import {Component, EventEmitter, Input, Output} from '@angular/core';

interface IButtonClasses {
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

  getOrganizerButtonClasses() : IButtonClasses {
    return {
      "role-button" : true,
      "not-selected-button" : !this.isOrganizer
    }
  }

  getProviderButtonClasses() : IButtonClasses {
    return {
      "role-button" : true,
      "not-selected-button" : this.isOrganizer
    }
  }
}
