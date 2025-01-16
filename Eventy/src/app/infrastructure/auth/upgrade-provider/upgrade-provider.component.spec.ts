import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeProviderComponent } from './upgrade-provider.component';

describe('UpgradeProviderComponent', () => {
  let component: UpgradeProviderComponent;
  let fixture: ComponentFixture<UpgradeProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpgradeProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
