import { TestBed } from '@angular/core/testing';

import { InputComponentDragService } from './input-component-drag.service';

describe('InputComponentDragService', () => {
  let service: InputComponentDragService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputComponentDragService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
