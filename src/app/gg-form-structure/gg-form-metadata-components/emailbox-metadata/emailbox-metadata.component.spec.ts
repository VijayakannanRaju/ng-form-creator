import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailboxMetadataComponent } from './emailbox-metadata.component';

describe('EmailboxMetadataComponent', () => {
  let component: EmailboxMetadataComponent;
  let fixture: ComponentFixture<EmailboxMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailboxMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailboxMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
