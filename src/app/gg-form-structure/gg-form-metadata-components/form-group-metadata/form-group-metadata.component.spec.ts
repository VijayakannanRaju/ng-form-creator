import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupMetadataComponent } from './form-group-metadata.component';

describe('FormGroupMetadataComponent', () => {
  let component: FormGroupMetadataComponent;
  let fixture: ComponentFixture<FormGroupMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
