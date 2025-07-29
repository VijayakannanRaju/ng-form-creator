import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionMetadataComponent } from './description-metadata.component';

describe('DescriptionMetadataComponent', () => {
  let component: DescriptionMetadataComponent;
  let fixture: ComponentFixture<DescriptionMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
