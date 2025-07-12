import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgInputSelectionComponent } from './gg-input-selection.component';

describe('GgInputSelectionComponent', () => {
  let component: GgInputSelectionComponent;
  let fixture: ComponentFixture<GgInputSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GgInputSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GgInputSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
