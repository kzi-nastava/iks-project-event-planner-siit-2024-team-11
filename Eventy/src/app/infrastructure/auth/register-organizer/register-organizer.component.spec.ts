import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrganizerComponent } from './register-organizer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthServiceMock} from '../auth.service.mock';

describe('RegisterOrganizerComponent', () => {
  let component: RegisterOrganizerComponent;
  let fixture: ComponentFixture<RegisterOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [RegisterOrganizerComponent],
      providers: [{provide: AuthService, useClass: AuthServiceMock}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // create a mock -- DONE
  // create tests with the last slide
  // check dialogs that pop up and check validity of control form
});
