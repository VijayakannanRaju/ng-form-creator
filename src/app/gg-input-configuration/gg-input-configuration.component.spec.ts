import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgInputConfigurationComponent } from './gg-input-configuration.component';

describe('GgInputConfigurationComponent', () => {
  let component: GgInputConfigurationComponent;
  let fixture: ComponentFixture<GgInputConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GgInputConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GgInputConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
