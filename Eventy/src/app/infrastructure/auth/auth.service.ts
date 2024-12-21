import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from '../../../env/constants';
import {AuthResponse} from './model/auth-response.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Login} from './model/login.model';
import {RegisterData} from './model/register.model';

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

  id: number = null;

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

  setId(id: number): void {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
