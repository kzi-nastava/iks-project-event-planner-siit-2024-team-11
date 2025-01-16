import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from '../../../env/constants';
import {AuthResponse} from './model/auth-response.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Login} from './model/login.model';
import {RegisterData} from './model/register.model';
import { UpgradeProfileData } from './model/upgrade-profile.model';
import { FastRegistrationData } from './model/fast-registration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urlPrefix: string = "/api/authentication/";

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + this.urlPrefix + 'login', auth, {
      headers: this.headers,
    });
  }

  register(registerData: RegisterData): Observable<string> {
    return this.http.post<string>(environment.apiHost + this.urlPrefix + 'registration', registerData, {
      headers: this.headers,
      responseType: "text" as "json"
    });
  }

  confirmRegistration(requestId: number): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(environment.apiHost + this.urlPrefix + 'registration-confirmation/' + requestId, {}, {
      headers: this.headers,
    });
  }

  getRole(): string {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role;
    }
    return null;
  }

  getId(): number {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return Number(helper.decodeToken(accessToken).id);
    }

    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  upgradeProfile(upgradeProfileData: UpgradeProfileData): Observable<string> {
    return this.http.post<string>(
      environment.apiHost + this.urlPrefix + 'upgrade-profile', upgradeProfileData, {
        responseType: 'text' as 'json', 
      });
  }

  fastRegister(fastRegistrationData: FastRegistrationData): Observable<string> {
    return this.http.post<string>(
      environment.apiHost + this.urlPrefix + 'fast-registration', fastRegistrationData, {
        responseType: 'text' as 'json', 
      });
  }

  decryptEmail(encryptedEmail: string): Observable<string> {
    let email = this.http.get<string>(environment.apiHost + this.urlPrefix + 'fast-registration/' + encryptedEmail, {
      responseType: 'text' as 'json', 
    });
    return email;
  }
}
