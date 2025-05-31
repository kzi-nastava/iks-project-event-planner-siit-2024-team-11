import {Injectable} from '@angular/core';
import {RegisterData} from './model/register.model';

@Injectable()
export class AuthServiceMock {
  constructor() { }

  register(registerData: RegisterData): string {
    return "Registration successful!";
  }
}
