import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChatsViewComponent } from './all-chats-view.component';

describe('AllChatsViewComponent', () => {
  let component: AllChatsViewComponent;
  let fixture: ComponentFixture<AllChatsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllChatsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllChatsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
