import { Component } from '@angular/core';
import {UserService} from '../user.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({
    email : new FormControl(),
    password: new FormControl(),
  });

  constructor(private userService: UserService) {

  }

  login() : void {
    if(this.userService.login(this.loginForm.value.email, this.loginForm.value.password)) {
      alert("Succesfully logged in: " +  this.loginForm.value.email + " " +  this.loginForm.value.password);
    } else {
      alert("Wrong credentials!");
    }
  }
}
