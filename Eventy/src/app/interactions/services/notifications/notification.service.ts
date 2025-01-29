import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly urlPrefix: string = "/api/notifications";

  constructor(private httpClient: HttpClient) { }
}
