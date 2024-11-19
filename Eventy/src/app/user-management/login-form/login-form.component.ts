import { Component } from '@angular/core';
import {UserService} from '../user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {InvalidInputDataDialogComponent} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

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

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {

  }

  login() : void {
    if(this.userService.login(this.loginForm.value.email, this.loginForm.value.password)) {
      this.router.navigate(['']);
    } else {
      this.dialog.open(InvalidInputDataDialogComponent, {
        data : {
          title: "Wrong credentials!",
          message: "Email and password don't match"
        }
      });
    }
  }
}
