import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeMetadataComponent } from './date-time-metadata.component';

describe('DateTimeMetadataComponent', () => {
  let component: DateTimeMetadataComponent;
  let fixture: ComponentFixture<DateTimeMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
