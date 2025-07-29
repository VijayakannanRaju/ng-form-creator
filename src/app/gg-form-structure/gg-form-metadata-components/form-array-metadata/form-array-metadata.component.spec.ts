import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayMetadataComponent } from './form-array-metadata.component';

describe('FormArrayMetadataComponent', () => {
  let component: FormArrayMetadataComponent;
  let fixture: ComponentFixture<FormArrayMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArrayMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
