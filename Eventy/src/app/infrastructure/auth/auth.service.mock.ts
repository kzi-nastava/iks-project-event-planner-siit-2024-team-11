import {Injectable} from '@angular/core';
import {RegisterData} from './model/register.model';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthServiceMock {
  constructor() { }

  register(registerData: RegisterData): Observable<string> {
    return of("Registration successful!");
  }
}
