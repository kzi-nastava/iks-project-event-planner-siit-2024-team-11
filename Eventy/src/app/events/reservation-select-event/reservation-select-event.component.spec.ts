import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSelectEventComponent } from './reservation-select-event.component';

describe('ReservationSelectEventComponent', () => {
  let component: ReservationSelectEventComponent;
  let fixture: ComponentFixture<ReservationSelectEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationSelectEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSelectEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false and null on init', () => {
    spyOn(component.continueButtonClicked, 'emit');
    spyOn(component.selectedEventCardEventEmitter, 'emit');

    component.ngOnInit();

    expect(component.continueButtonClicked.emit).toHaveBeenCalledWith(false);
    expect(component.selectedEventCardEventEmitter.emit).toHaveBeenCalledWith(null);
  }); 

  
  
});
