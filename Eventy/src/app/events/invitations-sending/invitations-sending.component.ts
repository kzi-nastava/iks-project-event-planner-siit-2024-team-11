import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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
  emailControl: FormControl;

  constructor() {
    this.emailControl = new FormControl('', [
      Validators.required,
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
      const leftHeight = this.leftContainer.nativeElement.offsetHeight; // Get left container height
      this.rightContainer.nativeElement.style.height = `${leftHeight}px`; // Set right container height
    }
  }

  addEmail(): void {
    const newEmail = this.emailControl.value?.trim();
    if (this.emailControl.valid) {
      if (!this.invitedEmails.includes(newEmail)) {
        this.invitedEmails.push(newEmail);
        this.adjustRightContainerHeight();
        this.updateEmailValidator();
      } 
    } 
  }

  removeEmail(selectedEmail: String) {
    this.invitedEmails = this.invitedEmails.filter(email => email !== selectedEmail);
    this.adjustRightContainerHeight();
    this.updateEmailValidator();
  }

  private updateEmailValidator(): void {
    this.emailControl.setValidators([
      Validators.required,
      Validators.email,
      emailValidatorFn(this.invitedEmails)
    ]);
 
    this.emailControl.updateValueAndValidity();
  }
}
