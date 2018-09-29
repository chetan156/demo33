import { TestBed, inject } from '@angular/core/testing';

import { CustomTableService } from './custom-table.service';

describe('CustomTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomTableService]
    });
  });

  it('should be created', inject([CustomTableService], (service: CustomTableService) => {
    expect(service).toBeTruthy();
  }));
});
