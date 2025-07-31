import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOnly } from './time-only';

describe('TimeOnly', () => {
  let component: TimeOnly;
  let fixture: ComponentFixture<TimeOnly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOnly]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOnly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
