import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterOrganizerComponent} from './register-organizer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthServiceMock} from '../auth.service.mock';
import {MatDialog} from "@angular/material/dialog";
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {of} from "rxjs";
import {
  InvalidInputDataDialogComponent
} from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';

describe('RegisterOrganizerComponent', () => {
  let component: RegisterOrganizerComponent;
  let fixture: ComponentFixture<RegisterOrganizerComponent>;
  let dialog: MatDialog;
  let router: Router;
  let authService: AuthServiceMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      declarations: [RegisterOrganizerComponent],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        MatDialog, Router
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterOrganizerComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirmation dialog and navigate to home if registration without pictures succeeds', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(router, 'navigate');
    spyOn(authService, 'register').and.returnValue(of('Registration successful!'));

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['ProfilePicture.png'],
      email: 'test@example.com',
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Fake St',
      phoneNumber: '+123456789'
    });
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Confirmation needed!', message: 'Registration successful!'}
    });
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should open confirmation dialog and navigate to home if registration with a picture succeeds', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(router, 'navigate');
    spyOn(authService, 'register').and.returnValue(of('Registration successful!'));

    component.registerForm.controls['profilePicture'].setValue('Organiser.png');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['Organiser.png'],
      email: 'test@example.com',
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Fake St',
      phoneNumber: '+123456789'
    });
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Confirmation needed!', message: 'Registration successful!'}
    });
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should open invalid input dialog and display error around the field if email is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['email'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if email is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['email'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if email is just an array of letters', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('adfsadfs');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['email'].hasError('email')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if email is just an array of letters with @ at the beggining', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('@adfsadfs');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['email'].hasError('email')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if email is just an array of letters with @ at the end', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('adfsadfs@');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['email'].hasError('email')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if password is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['password'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if password is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['password'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if confirmed password is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['confirmedPassword'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if confirmed password is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['confirmedPassword'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if confirmed password does not match password', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password1234');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['confirmedPassword'].hasError('match')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if first name is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['firstName'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if first name is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['firstName'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if last name is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['lastName'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if last name is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['lastName'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if address is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['address'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if address is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['address'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number has characters that are not allowed', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('asddassa');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number has too many + signs', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('++1234567890');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number has only symbols and no digits', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+ ()');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open confirmation dialog and navigate to home if registration without pictures with phone number without + sign succeeds', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(router, 'navigate');
    spyOn(authService, 'register').and.returnValue(of('Registration successful!'));

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('123456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['ProfilePicture.png'],
      email: 'test@example.com',
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Fake St',
      phoneNumber: '123456789'
    });
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Confirmation needed!', message: 'Registration successful!'}
    });
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should open confirmation dialog and navigate to home if registration without pictures with phone number with - sign succeeds', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(router, 'navigate');
    spyOn(authService, 'register').and.returnValue(of('Registration successful!'));

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('12-3456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['ProfilePicture.png'],
      email: 'test@example.com',
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Fake St',
      phoneNumber: '12-3456789'
    });
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Confirmation needed!', message: 'Registration successful!'}
    });
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
