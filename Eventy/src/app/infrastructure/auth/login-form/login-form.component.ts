import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {InvalidInputDataDialogComponent} from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AuthResponse} from '../model/auth-response.model';
import {Login} from '../model/login.model';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';

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

  constructor(private authService: AuthService, 
              private dialog: MatDialog, 
              private router: Router) {}

  login(): void {
    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.accessToken);
          this.authService.setUser();

          localStorage.setItem('runHandleReviewEvents', 'true'); // for reviewing unreviewed & passed events after login
          this.router.navigate(['']);
        },
        error: (error) => {
          if (error.status === 403 && error.error) {
            this.dialog.open(ErrorDialogComponent, {
              data: {
                title: "Account Suspended!",
                message: `${error.error.message} You will be unsuspended on ${error.error.suspensionEndsAt}. 
                          Time left: ${error.error.timeLeft}.`
              }
            });
          } else {
            this.dialog.open(InvalidInputDataDialogComponent, {
              data : {
                title: "Wrong credentials!",
                message: "Email and password don't match"
              }
            });
          }
        }
      });
    }
  }
}
