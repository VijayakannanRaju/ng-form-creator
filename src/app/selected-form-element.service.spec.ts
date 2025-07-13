import { TestBed } from '@angular/core/testing';

import { SelectedFormElementService } from './selected-form-element.service';

describe('SelectedFormElementService', () => {
  let service: SelectedFormElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedFormElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
