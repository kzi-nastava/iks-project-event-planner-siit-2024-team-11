import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServicesViewCardComponent } from './my-services-view-card.component';

describe('MyServicesViewCardComponent', () => {
  let component: MyServicesViewCardComponent;
  let fixture: ComponentFixture<MyServicesViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyServicesViewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyServicesViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
