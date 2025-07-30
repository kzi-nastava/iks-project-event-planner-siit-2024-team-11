import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnEventsDialogComponent } from './own-events-dialog.component';

describe('OwnEventsDialogComponent', () => {
  let component: OwnEventsDialogComponent;
  let fixture: ComponentFixture<OwnEventsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnEventsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnEventsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
