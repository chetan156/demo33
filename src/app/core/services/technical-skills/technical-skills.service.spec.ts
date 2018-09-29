import { TestBed, inject } from '@angular/core/testing';

import { TechnicalSkillsService } from './technical-skills.service';

describe('TechnicalSkillsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnicalSkillsService]
    });
  });

  it('should be created', inject([TechnicalSkillsService], (service: TechnicalSkillsService) => {
    expect(service).toBeTruthy();
  }));
});
