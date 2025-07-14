import { TestBed } from '@angular/core/testing';

import { FormMetadataService } from './form-metadata.service';

describe('FormMetadataService', () => {
  let service: FormMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
