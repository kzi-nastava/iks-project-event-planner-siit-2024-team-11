import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationBasicInformationComponent } from './event-creation-basic-information.component';

describe('EventCreationBasicInformationComponent', () => {
  let component: EventCreationBasicInformationComponent;
  let fixture: ComponentFixture<EventCreationBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCreationBasicInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreationBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
