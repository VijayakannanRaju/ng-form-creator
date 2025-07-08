import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgFormCreatorNavBarComponent } from './gg-form-creator-nav-bar.component';

describe('GgFormCreatorNavBarComponent', () => {
  let component: GgFormCreatorNavBarComponent;
  let fixture: ComponentFixture<GgFormCreatorNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GgFormCreatorNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GgFormCreatorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
