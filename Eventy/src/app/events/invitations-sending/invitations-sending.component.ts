import { Component, ElementRef, ViewChild, Output, EventEmitter  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { emailValidatorFn } from './email-validator';

@Component({
  selector: 'app-invitations-sending',
  templateUrl: './invitations-sending.component.html',
  styleUrl: './invitations-sending.component.css'
})
export class InvitationsSendingComponent {
  @ViewChild('left_container') leftContainer!: ElementRef;
  @ViewChild('right_container') rightContainer!: ElementRef;
  invitedEmails: string[] = [];
  @Output() invitedEmailsEventEmitter = new EventEmitter<string[]>();
  emailControl: FormControl;

  constructor() {
    this.emailControl = new FormControl('', [
      Validators.email,
      emailValidatorFn(this.invitedEmails)
    ]);
  }

  ngAfterViewInit() {
    this.adjustRightContainerHeight();
  }

  onScreenResize(event: any) {
    this.adjustRightContainerHeight();
  }

  private adjustRightContainerHeight(): void {
    if (this.leftContainer && this.rightContainer) {
      const leftHeight = this.leftContainer.nativeElement.offsetHeight; 
      this.rightContainer.nativeElement.style.height = `${leftHeight}px`; 
    }
  }

  addEmail(): void {
    const newEmail = this.emailControl.value?.trim();
    if (this.emailControl.valid) {
      if (!this.invitedEmails.includes(newEmail)) {
        this.invitedEmails.push(newEmail);
        this.invitedEmailsEventEmitter.emit(this.invitedEmails);
        this.adjustRightContainerHeight();
        this.updateEmailValidator();
      } 
    } 
  }

  removeEmail(selectedEmail: String) {
    this.invitedEmails = this.invitedEmails.filter(email => email !== selectedEmail);
    this.invitedEmailsEventEmitter.emit(this.invitedEmails);
    this.adjustRightContainerHeight();
    this.updateEmailValidator();
  }

  private updateEmailValidator(): void {
    this.emailControl.setValidators([
      Validators.email,
      emailValidatorFn(this.invitedEmails)
    ]);
 
    this.emailControl.updateValueAndValidity();
  }
}
