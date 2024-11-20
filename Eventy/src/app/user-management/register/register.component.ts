import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isOrganizer : boolean = true;

  setRegisterType(isOrganiser: boolean) : void {
    this.isOrganizer = isOrganiser;
  }
}
