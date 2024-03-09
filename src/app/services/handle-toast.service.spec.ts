import { TestBed } from '@angular/core/testing';

import { HandleToastService } from './handle-toast.service';

describe('HandleToastService', () => {
  let service: HandleToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
