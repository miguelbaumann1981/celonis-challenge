import { TestBed } from '@angular/core/testing';

import { HandleFormulaService } from './handle-formula.service';

describe('HandleFormulaService', () => {
  let service: HandleFormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleFormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
