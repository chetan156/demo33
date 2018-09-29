import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackfieldsComponent } from './feedbackfields.component';

describe('FeedbackfieldsComponent', () => {
  let component: FeedbackfieldsComponent;
  let fixture: ComponentFixture<FeedbackfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackfieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
