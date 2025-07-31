import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emailbox } from './emailbox';

describe('Emailbox', () => {
  let component: Emailbox;
  let fixture: ComponentFixture<Emailbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emailbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emailbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
