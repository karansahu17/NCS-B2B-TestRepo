import { TestBed } from '@angular/core/testing';

import { LineItemService } from './line-item.service';

describe('LineItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineItemService = TestBed.get(LineItemService);
    expect(service).toBeTruthy();
  });
});
