import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingMetadataComponent } from './heading-metadata.component';

describe('HeadingMetadataComponent', () => {
  let component: HeadingMetadataComponent;
  let fixture: ComponentFixture<HeadingMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
