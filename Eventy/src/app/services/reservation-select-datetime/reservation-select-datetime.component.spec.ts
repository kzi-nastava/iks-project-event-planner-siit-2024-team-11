import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSelectDatetimeComponent } from './reservation-select-datetime.component';

describe('ReservationSelectDatetimeComponent', () => {
  let component: ReservationSelectDatetimeComponent;
  let fixture: ComponentFixture<ReservationSelectDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationSelectDatetimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSelectDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
