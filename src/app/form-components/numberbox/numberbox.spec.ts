import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Numberbox } from './numberbox';

describe('Numberbox', () => {
  let component: Numberbox;
  let fixture: ComponentFixture<Numberbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Numberbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Numberbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
