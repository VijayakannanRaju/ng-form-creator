import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaMetadataComponent } from './textarea-metadata.component';

describe('TextareaMetadataComponent', () => {
  let component: TextareaMetadataComponent;
  let fixture: ComponentFixture<TextareaMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
