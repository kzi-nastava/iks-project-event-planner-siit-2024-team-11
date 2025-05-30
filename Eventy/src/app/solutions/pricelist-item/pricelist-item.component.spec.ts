import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistItemComponent } from './pricelist-item.component';

describe('PricelistItemComponent', () => {
  let component: PricelistItemComponent;
  let fixture: ComponentFixture<PricelistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PricelistItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricelistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
