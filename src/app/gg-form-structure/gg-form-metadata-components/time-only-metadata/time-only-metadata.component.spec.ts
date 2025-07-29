import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOnlyMetadataComponent } from './time-only-metadata.component';

describe('TimeOnlyMetadataComponent', () => {
  let component: TimeOnlyMetadataComponent;
  let fixture: ComponentFixture<TimeOnlyMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOnlyMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOnlyMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
