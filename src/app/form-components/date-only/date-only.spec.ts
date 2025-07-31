import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateOnly } from './date-only';

describe('DateOnly', () => {
  let component: DateOnly;
  let fixture: ComponentFixture<DateOnly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateOnly]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateOnly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
