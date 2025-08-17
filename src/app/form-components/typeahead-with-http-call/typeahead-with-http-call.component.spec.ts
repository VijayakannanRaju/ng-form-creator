import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { TypeaheadWithHttpCallComponent } from './typeahead-with-http-call.component';
import { TypeAheadWithHttpCallMetadata } from '../../form.type';

describe('TypeaheadWithHttpCallComponent', () => {
  let component: TypeaheadWithHttpCallComponent;
  let fixture: ComponentFixture<TypeaheadWithHttpCallComponent>;

  const mockMetadata: TypeAheadWithHttpCallMetadata = {
    id: 'test-typeahead',
    type: 'TYPEAHEAD_WITH_HTTP_CALL',
    name: 'test-typeahead',
    displayLabel: 'Test Typeahead',
    displayName: 'Test Typeahead',
    arrayInResponsePath: 'data',
    optionDisplayLabelKeyInArray: 'name',
    optionValueKeyInArray: 'id',
    httpCallUrl: 'https://api.example.com/search',
    httpCallMethod: 'GET',
    iconName: 'typeahead-with-http-call.png',
    showMetadataDiv: false,
    containerWidthInLargeScreen: 'full-width',
    containerWidthInMediumScreen: 'full-width',
    containerWidthInSmallScreen: 'full-width',
    componentWidthInLargeScreen: 12,
    componentWidthInMediumScreen: 12,
    componentWidthInSmallScreen: 12
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TypeaheadWithHttpCallComponent,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TypeaheadModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TypeaheadWithHttpCallComponent);
    component = fixture.componentInstance;
    component.metadata = mockMetadata;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with metadata values', () => {
    expect(component.label).toBe('Test Typeahead');
    expect(component.required).toBeFalsy();
  });

  it('should set required when metadata has required flag', () => {
    component.metadata = { ...mockMetadata, required: true };
    component.ngOnInit();
    expect(component.required).toBeTruthy();
  });

  it('should implement ControlValueAccessor methods', () => {
    const mockFn = jasmine.createSpy('mock function');
    
    component.registerOnChange(mockFn);
    component.registerOnTouched(mockFn);
    
    expect(component['onChange']).toBe(mockFn);
    expect(component['onTouched']).toBe(mockFn);
  });

  it('should handle value changes', () => {
    const testValue = 'test value';
    component.writeValue(testValue);
    expect(component.value).toBe(testValue);
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    expect(component.isDisabled).toBeTruthy();
    expect(component.control.disabled).toBeTruthy();
  });

  it('should clear value when clearValue is called', () => {
    component.value = 'test';
    component.control.setValue('test');
    component.clearValue();
    expect(component.value).toBeNull();
    expect(component.control.value).toBe('');
  });

  it('should handle focus and blur events', () => {
    component.onFocus();
    expect(component.isFocused).toBeTruthy();
    
    component.onBlur();
    expect(component.isFocused).toBeFalsy();
  });

  it('should show error message when invalid', () => {
    component.metadata = { ...mockMetadata, required: true };
    component.required = true;
    component.ngOnInit();
    
    component.control.markAsTouched();
    component.control.setValue('');
    
    expect(component.isInvalid).toBeTruthy();
    expect(component.getErrorMessage()).toContain('Test Typeahead is required');
  });
});
