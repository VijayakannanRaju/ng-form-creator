import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgFormStructureComponent } from './gg-form-structure.component';

describe('GgFormStructureComponent', () => {
  let component: GgFormStructureComponent;
  let fixture: ComponentFixture<GgFormStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GgFormStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GgFormStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
