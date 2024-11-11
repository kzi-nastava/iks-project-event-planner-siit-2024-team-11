import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsSendingComponent } from './invitations-sending.component';

describe('InvitationsSendingComponent', () => {
  let component: InvitationsSendingComponent;
  let fixture: ComponentFixture<InvitationsSendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitationsSendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationsSendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
