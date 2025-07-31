import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxMulti } from './checkbox-multi';

describe('CheckboxMulti', () => {
  let component: CheckboxMulti;
  let fixture: ComponentFixture<CheckboxMulti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxMulti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxMulti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
