import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxMultiMetadataComponent } from './checkbox-multi-metadata.component';

describe('CheckboxMultiMetadataComponent', () => {
  let component: CheckboxMultiMetadataComponent;
  let fixture: ComponentFixture<CheckboxMultiMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxMultiMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxMultiMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
