import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {InvalidInputDataDialogComponent} from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AuthResponse} from '../model/auth-response.model';
import {Login} from '../model/login.model';

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

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {

  }

  login(): void {

    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.token);
          this.authService.setUser();
          this.router.navigate(['home']);
        },
        error: () => {
          this.dialog.open(InvalidInputDataDialogComponent, {
            data : {
              title: "Wrong credentials!",
              message: "Email and password don't match"
            }
          });
        }
      });
    }
  }
}
