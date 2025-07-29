import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMetadataComponent } from './dropdown-metadata.component';

describe('DropdownMetadataComponent', () => {
  let component: DropdownMetadataComponent;
  let fixture: ComponentFixture<DropdownMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
