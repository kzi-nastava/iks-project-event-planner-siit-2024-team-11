import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly urlPrefix: string = "/api/messages";

  constructor(private httpClient: HttpClient) { }
}
