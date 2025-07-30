import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProviderComponent } from './register-provider.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthServiceMock} from '../auth.service.mock';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../auth.service';
import {of} from 'rxjs';
import {
  InvalidInputDataDialogComponent
} from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';

describe('RegisterProviderComponent', () => {
  let component: RegisterProviderComponent;
  let fixture: ComponentFixture<RegisterProviderComponent>;
  let dialog: MatDialog;
  let router: Router;
  let authService: AuthServiceMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      declarations: [RegisterProviderComponent],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        MatDialog, Router
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProviderComponent);
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['ProfilePicture.png'],
      email: 'test@example.com',
      password: 'Password123',
      name: 'Provider',
      description: 'Provider Desc',
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

    component.registerForm.controls['profilePictures'].setValue(['Provider.png']);
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['Provider.png'],
      email: 'test@example.com',
      password: 'Password123',
      name: 'Provider',
      description: 'Provider Desc',
      address: '123 Fake St',
      phoneNumber: '+123456789'
    });
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Confirmation needed!', message: 'Registration successful!'}
    });
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should open confirmation dialog and navigate to home if registration with multiple pictures succeeds', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(router, 'navigate');
    spyOn(authService, 'register').and.returnValue(of('Registration successful!'));

    component.registerForm.controls['profilePictures'].setValue(['Provider.png', 'provider_white_background.png']);
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['Provider.png', 'provider_white_background.png'],
      email: 'test@example.com',
      password: 'Password123',
      name: 'Provider',
      description: 'Provider Desc',
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['confirmedPassword'].hasError('match')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if name is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['name'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if name is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['name'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if description is not set', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['description'].hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if description is set empty', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+123456789');
    component.register();

    expect(component.registerForm.controls['description'].hasError('required')).toBeTruthy();
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('+ ()');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number starts with - sign', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('-394289384');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number ends with - sign', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('394289384-');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number ends with + sign', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('094289384+');
    component.register();

    expect(component.registerForm.controls['phoneNumber'].hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(dialog.open).toHaveBeenCalledWith(InvalidInputDataDialogComponent, {
      data: {title: 'Invalid input', message: 'Invalid registration data'}
    });
  });

  it('should open invalid input dialog and display error around the field if phone number has + sign between digits', () => {
    spyOn(dialog, 'open');

    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password123');
    component.registerForm.controls['confirmedPassword'].setValue('Password123');
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('0942+89384');
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('123456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['ProfilePicture.png'],
      email: 'test@example.com',
      password: 'Password123',
      name: 'Provider',
      description: 'Provider Desc',
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
    component.registerForm.controls['name'].setValue('Provider');
    component.registerForm.controls['description'].setValue('Provider Desc');
    component.registerForm.controls['address'].setValue('123 Fake St');
    component.registerForm.controls['phoneNumber'].setValue('12-3456789');
    component.register();

    expect(component.registerForm.valid).toBeTruthy();
    expect(authService.register).toHaveBeenCalledWith({
      profilePictures: ['ProfilePicture.png'],
      email: 'test@example.com',
      password: 'Password123',
      name: 'Provider',
      description: 'Provider Desc',
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
