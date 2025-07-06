import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RegisterData } from './model/register.model';


describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', () => {
    const user: RegisterData = {
      profilePictures: [],
      email: 'ves@gmail.com',
      password: 'admin',
      firstName: 'Ves',
      lastName: 'Ves Last',
      address: 'Some Address 27',
      phoneNumber: '+381 64 76 24 099',
    }

    service.register(user).subscribe((data) => expect(data).toEqual("Registration successful"));

    const req = httpController.expectOne('http://localhost:8080/api/authentication/registration');
    expect(req.request.method).toBe('POST');
    req.flush("Registration successful");
  })
});
