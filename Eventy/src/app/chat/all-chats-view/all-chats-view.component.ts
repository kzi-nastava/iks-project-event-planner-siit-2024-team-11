import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat, Message } from '../model/chat.model';
import { ChatService } from '../chat.service';
import { Client } from '@stomp/stompjs';
import { AuthService } from '../../infrastructure/auth/auth.service';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-all-chats-view',
  templateUrl:   './all-chats-view.component.html',
  styleUrl: './all-chats-view.component.css'
})
export class AllChatsViewComponent implements OnInit {
  @Input() newChatOpen: boolean = false;
  @Output() newMessageReceived: Message;


  allChats: Chat[]
  activeChat: Chat
  websocketConnected: boolean = false;
  private stompClient: Client | null = null;

  constructor(private chatService: ChatService, private authService: AuthService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const navigationState = history.state;
    if (navigationState && typeof navigationState.newChatOpen === 'boolean') {
      this.newChatOpen = navigationState.newChatOpen
    }

    this.chatService.getUserChats().subscribe({
      next: (response: Chat[]) => {
        this.allChats = response;
        this.connectWebSocket();
        if (this.newChatOpen) {
          this.activeChat = this.allChats[0]
        }
      }
    })
  }

  onCardClick(chat: any) {
    if (this.activeChat !== chat) {
      this.activeChat = chat;
    }
  }

  private connectWebSocket() {

    const socket = new WebSocket('http://localhost:8080/chats'); 
    
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000, // Reconnect after 5 seconds if disconnected
      onConnect: () => {
        this.websocketConnected = true;
        console.log('Connected to WebSocket');
  
        // subscribe
        this.stompClient?.subscribe(`/topic/chat/${this.authService.getId()}`, (message) => {
          const incomingMessage: Message = JSON.parse(message.body);
          this.newMessageReceived = incomingMessage;

          let index: number = -1;
          if (incomingMessage.senderId === this.authService.getId()) {
            index = this.allChats.findIndex(v => this.activeChat.chatId === v.chatId)
          } else {
            index = this.allChats.findIndex(v => v.otherId === incomingMessage.senderId)
          }

          console.log(index)
          if (index === -1) {
            this.chatService.getUserChats().subscribe({
              next: (response: Chat[]) => {
                this.allChats = response;
              }
            })
          }

          if (index !== 0) {
            const item = this.allChats.splice(index, 1)[0]
            this.allChats = [item, ...this.allChats]
            this.cdRef.detectChanges();
          }

        });
      },
      onDisconnect: () => {
        this.websocketConnected = false;
        console.log('Disconnected from WebSocket');
      }
    });

    this.stompClient = stompClient;
    this.stompClient.activate();
  }
}
