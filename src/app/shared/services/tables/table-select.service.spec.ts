import { TestBed, inject } from '@angular/core/testing';

import { TableSelectService } from './table-select.service';

describe('TableSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableSelectService]
    });
  });

  it('should be created', inject([TableSelectService], (service: TableSelectService) => {
    expect(service).toBeTruthy();
  }));
});
