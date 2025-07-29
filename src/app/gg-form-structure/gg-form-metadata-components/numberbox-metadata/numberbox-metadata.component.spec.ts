import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberboxMetadataComponent } from './numberbox-metadata.component';

describe('NumberboxMetadataComponent', () => {
  let component: NumberboxMetadataComponent;
  let fixture: ComponentFixture<NumberboxMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberboxMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberboxMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
