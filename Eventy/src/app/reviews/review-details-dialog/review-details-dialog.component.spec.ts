import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDetailsDialogComponent } from './review-details-dialog.component';

describe('ReviewDetailsDialogComponent', () => {
  let component: ReviewDetailsDialogComponent;
  let fixture: ComponentFixture<ReviewDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
