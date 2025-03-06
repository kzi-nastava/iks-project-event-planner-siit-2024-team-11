import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chat, Message, MessageList } from '../model/chat.model';
import { ChatService } from '../chat.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.css'
})
export class ChatViewComponent implements OnChanges, AfterViewChecked {

  @ViewChild('messageBoxWrapper') messageBoxWrapper!: ElementRef;
  @Input() activeChat: Chat
  @Input() newMessageReceived: Message

  private websocketConnected: boolean = false;

  messages: MessageList
  currentId: number
  newMessage: string = ""

  constructor(private chatService: ChatService, private authService: AuthService, private dialog: MatDialog) {
    this.currentId = authService.getId();
  }

  ngOnInit() {
    this.chatService.getMessages(this.activeChat.chatId).subscribe({
      next: (response: MessageList) => {
        this.messages = response;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['activeChat']) {
      this.chatService.getMessages(this.activeChat.chatId).subscribe({
        next: (response: MessageList) => {
          this.messages = response;
          console.log(this.messages)
        }
      })
    }
    if(changes['newMessageReceived'] && this.newMessageReceived) {
      if (this.newMessageReceived.senderId === this.activeChat.otherId || this.newMessageReceived.senderId === this.authService.getId())
      {
        this.messages.allMessages.push(this.newMessageReceived);
      } 
    }
  }

  ngAfterViewChecked() {
    const messageBox = this.messageBoxWrapper.nativeElement;
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      let currentDateTime = new Date()
        let messageToSend: Message = {
          senderId: this.currentId,
          message: this.newMessage,
          timestamp: currentDateTime
        }

        this.chatService.sendMessage(this.activeChat.chatId, messageToSend).subscribe({
          error: (err) => {
            if (err.response === 403) {
              this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                disableClose: true, // prevents closing by clicking outside
                backdropClass: 'blurred_backdrop_dialog',
                data: {
                  title: 'Blocked',
                  message: 'You have blocked or been blocked by the recipient! You can not send any messages!',
                },
              });
            }
          }
        });
        this.newMessage = '';
    }
  }

  handleReport(): void {
    // TO-DO
  }

  handleBlock(): void {
    // TO-DO
  }
}
