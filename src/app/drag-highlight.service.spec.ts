import { TestBed } from '@angular/core/testing';

import { DragHighlightService } from './drag-highlight.service';

describe('DragHighlightService', () => {
  let service: DragHighlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragHighlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
