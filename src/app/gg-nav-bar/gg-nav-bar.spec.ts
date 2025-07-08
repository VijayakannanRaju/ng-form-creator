import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgNavBar } from './gg-nav-bar';

describe('GgNavBar', () => {
  let component: GgNavBar;
  let fixture: ComponentFixture<GgNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GgNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GgNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
