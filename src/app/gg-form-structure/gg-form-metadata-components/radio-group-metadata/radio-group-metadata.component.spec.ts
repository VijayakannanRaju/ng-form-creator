import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupMetadataComponent } from './radio-group-metadata.component';

describe('RadioGroupMetadataComponent', () => {
  let component: RadioGroupMetadataComponent;
  let fixture: ComponentFixture<RadioGroupMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioGroupMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
