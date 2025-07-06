import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistMenuComponent } from './pricelist-menu.component';

describe('PricelistMenuComponent', () => {
  let component: PricelistMenuComponent;
  let fixture: ComponentFixture<PricelistMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PricelistMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricelistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
