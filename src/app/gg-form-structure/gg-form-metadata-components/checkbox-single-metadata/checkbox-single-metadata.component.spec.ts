import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSingleMetadataComponent } from './checkbox-single-metadata.component';

describe('CheckboxSingleMetadataComponent', () => {
  let component: CheckboxSingleMetadataComponent;
  let fixture: ComponentFixture<CheckboxSingleMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxSingleMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxSingleMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
