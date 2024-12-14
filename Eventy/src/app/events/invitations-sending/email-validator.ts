import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidatorFn(invitedEmails: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (invitedEmails.includes(email)) {
      return { reccuring: true };   
    }
    return null;
  };
}