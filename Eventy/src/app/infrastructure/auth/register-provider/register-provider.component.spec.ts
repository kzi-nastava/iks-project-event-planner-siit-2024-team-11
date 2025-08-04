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
      profilePictures: ['data:image/png;base64,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'],
      email: 'test@example.com',
      password: 'Password123',
      confirmedPassword: 'Password123',
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
      confirmedPassword: 'Password123',
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
      confirmedPassword: 'Password123',
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
      profilePictures: ['data:image/png;base64,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'],
      email: 'test@example.com',
      password: 'Password123',
      confirmedPassword: 'Password123',
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
      profilePictures: ['data:image/png;base64,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'],
      email: 'test@example.com',
      password: 'Password123',
      confirmedPassword: 'Password123',
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
