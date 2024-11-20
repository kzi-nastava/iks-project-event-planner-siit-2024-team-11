import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServicesViewComponent } from './my-services-view.component';

describe('MyServicesViewComponent', () => {
  let component: MyServicesViewComponent;
  let fixture: ComponentFixture<MyServicesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyServicesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyServicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
