import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionCategoryRequestViewDualCardComponent } from './solution-category-request-view-dual-card.component';

describe('SolutionCategoryRequestViewDualCardComponent', () => {
  let component: SolutionCategoryRequestViewDualCardComponent;
  let fixture: ComponentFixture<SolutionCategoryRequestViewDualCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionCategoryRequestViewDualCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionCategoryRequestViewDualCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
