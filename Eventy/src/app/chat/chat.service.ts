import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../env/constants';
import { Chat, Message, MessageList } from './model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly urlPrefix: string = "/api/chats"

  constructor(private httpClient: HttpClient) { }

  getUserChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(environment.apiHost + this.urlPrefix);
  }

  getMessages(chatId: number): Observable<MessageList> {
    return this.httpClient.get<MessageList>(environment.apiHost + this.urlPrefix + "/messages/" + chatId);
  }

  sendMessage(chatId: number, message: Message): Observable<any> {
    return this.httpClient.post<any>(environment.apiHost + this.urlPrefix + "/messages/" + chatId, message);
  }

  createChat(otherId: number): Observable<any> {
    return this.httpClient.post<any>(environment.apiHost + this.urlPrefix + "/" + otherId, {});
  }
}
