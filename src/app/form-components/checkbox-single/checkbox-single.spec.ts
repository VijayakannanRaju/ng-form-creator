import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSingle } from './checkbox-single';

describe('CheckboxSingle', () => {
  let component: CheckboxSingle;
  let fixture: ComponentFixture<CheckboxSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxSingle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxSingle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
