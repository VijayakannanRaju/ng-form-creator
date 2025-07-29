import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateOnlyMetadataComponent } from './date-only-metadata.component';

describe('DateOnlyMetadataComponent', () => {
  let component: DateOnlyMetadataComponent;
  let fixture: ComponentFixture<DateOnlyMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateOnlyMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateOnlyMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
