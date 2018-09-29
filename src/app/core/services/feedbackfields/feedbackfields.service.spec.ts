import { TestBed, inject } from '@angular/core/testing';

import { FeedbackfieldsService } from './feedbackfields.service';

describe('FeedbackfieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackfieldsService]
    });
  });

  it('should be created', inject([FeedbackfieldsService], (service: FeedbackfieldsService) => {
    expect(service).toBeTruthy();
  }));
});
