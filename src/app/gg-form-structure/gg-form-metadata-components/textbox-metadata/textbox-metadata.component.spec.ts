import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxMetadataComponent } from './textbox-metadata.component';

describe('TextboxMetadataComponent', () => {
  let component: TextboxMetadataComponent;
  let fixture: ComponentFixture<TextboxMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextboxMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextboxMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
