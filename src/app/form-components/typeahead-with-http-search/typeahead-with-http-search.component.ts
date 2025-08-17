import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TypeAheadWithHttpSearchMetadata } from '../../form.type';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, map, takeUntil, filter } from 'rxjs/operators';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-typeahead-with-http-search',
  templateUrl: './typeahead-with-http-search.component.html',
  styleUrl: './typeahead-with-http-search.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TypeaheadModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeaheadWithHttpSearchComponent),
      multi: true
    }
  ],
})
export class TypeaheadWithHttpSearchComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() metadata?: TypeAheadWithHttpSearchMetadata;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() required!: boolean;
  @Input() readonly = false;
  @Input() disabled = false;

  value: any = null;
  isDisabled = false;
  control = new FormControl('');
  isLoading = false; // This will be managed by ngx-bootstrap
  isValidSelection = true;
  selectedDisplayText: string | null = null; // Store the original selected display text

  
  // Observable for ngx-bootstrap async typeahead
  suggestions$: Observable<any[]> = of([]);
  
  private destroy$ = new Subject<void>();
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    console.log('🏗️ Constructor called');
  }

  ngOnInit() {
    console.log('🚀 ngOnInit called');
    console.log('🚀 metadata:', this.metadata);
    
    if (this.metadata) {
      this.label = this.metadata.displayLabel;
      this.placeholder = this.metadata.placeholder || 'Start typing to search...';
      this.required = !!this.metadata.required;
      
      console.log('🚀 Set label:', this.label);
      console.log('🚀 Set placeholder:', this.placeholder);
      console.log('🚀 Set required:', this.required);
    }

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
      console.log('🚀 Added required validator');
    }
    
    console.log('🚀 Validators array:', validators);
    this.control.setValidators(validators);
    
    console.log('🚀 Control validators set');
    console.log('🚀 Control initial state - value:', this.control.value);
    console.log('🚀 Control initial state - valid:', this.control.valid);
    console.log('🚀 Control initial state - touched:', this.control.touched);
    
    this.setupAsyncTypeahead();
    
    console.log('🚀 ngOnInit completed');
    console.log('🚀 Final suggestions$:', this.suggestions$);
  }

  private setupAsyncTypeahead() {
    if (!this.metadata) return;

    console.log('🔧 Setting up async typeahead for:', this.metadata.displayLabel);

    // Create the suggestions observable using the proper ngx-bootstrap async pattern
    // This avoids conflicts with valueChanges and gives ngx-bootstrap full control
    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      // This will be called by ngx-bootstrap when it needs suggestions
      observer.next(this.control.value || '');
    }).pipe(
      debounceTime(300), // Prevent rapid API calls
      distinctUntilChanged(), // Only emit when value actually changes
      filter((searchTerm: string | undefined): searchTerm is string => {
        // Filter out empty or too short terms early
        if (!searchTerm || searchTerm.trim().length < 2) {
          console.log('❌ Search term too short, returning empty array');
          return false;
        }
        return true;
      }),
      switchMap((searchTerm: string) => {
        console.log('🔄 Making API call for:', searchTerm);
        
        return this.searchData(searchTerm).pipe(
          map(results => {
            const processedResults = this.processSearchResults(results);
            console.log('✅ Processed search results:', processedResults, 'Length:', processedResults.length);
            return processedResults;
          }),
          catchError(error => {
            console.error('❌ Search error:', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.destroy$) // Clean up when component is destroyed
    );

    console.log('🔧 suggestions$ observable created using proper async pattern');
    
    // Debug: Subscribe to see what's being emitted
    this.suggestions$.subscribe(results => {
      console.log('🔧 suggestions$ emitted to ngx-bootstrap:', results, 'Length:', results.length);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private searchData(searchTerm: string): Observable<any> {
    if (!this.metadata?.httpCallUrl || !searchTerm || searchTerm.trim().length === 0) {
      return of([]);
    }

    // Build URL with search query parameter
    let url = this.metadata.httpCallUrl;
    
    if (this.metadata.httpCallSearchQueryParam) {
      // If the URL already has query parameters, append with &
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}${this.metadata.httpCallSearchQueryParam}=${encodeURIComponent(searchTerm)}`;
    }

    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Search API error:', error);
        return of([]);
      })
    );
  }

  private processSearchResults(results: any): any[] {
    if (!this.metadata || !results) {
      console.log('processSearchResults: No metadata or results');
      return [];
    }

    console.log('processSearchResults: Processing results:', results);
    console.log('processSearchResults: arrayInResponsePath:', this.metadata.arrayInResponsePath);

    let dataArray: any = results;
    
    if (this.metadata.arrayInResponsePath && this.metadata.arrayInResponsePath.trim() !== '') {
      try {
        // Only try to extract if we have actual data
        if (results && typeof results === 'object' && Object.keys(results).length > 0) {
          dataArray = this.extractArrayFromPath(results, this.metadata.arrayInResponsePath);
          console.log('processSearchResults: Extracted dataArray:', dataArray);
        } else {
          console.log('processSearchResults: No valid results object');
          return [];
        }
      } catch (error) {
        console.error('Error extracting array from path:', error);
        return [];
      }
    }

    if (!Array.isArray(dataArray)) {
      console.warn('Extracted data is not an array:', dataArray);
      return [];
    }

    console.log('processSearchResults: Final dataArray:', dataArray, 'Length:', dataArray.length);
    return dataArray;
  }

  private extractArrayFromPath(data: any, path: string): any {
    if (!path || path.trim() === '' || !data) {
      return data;
    }

    // If data is null/undefined, return empty array
    if (data === null || data === undefined) {
      return [];
    }

    const pathParts = path.split('.').reduce((parts: string[], part: string) => {
      const arrayIndexMatch = part.match(/^(.+)\[(\d+)\]$/);
      if (arrayIndexMatch) {
        parts.push(arrayIndexMatch[1]);
        parts.push(`[${arrayIndexMatch[2]}]`);
      } else {
        parts.push(part);
      }
      return parts;
    }, []);

    let current = data;
    
    for (const part of pathParts) {
      if (current === null || current === undefined) {
        console.warn(`Path part '${part}' is null/undefined, returning empty array`);
        return [];
      }

      if (part.startsWith('[') && part.endsWith(']')) {
        const index = parseInt(part.slice(1, -1));
        if (!Array.isArray(current)) {
          console.warn(`Expected array at '${part}', got ${typeof current}, returning empty array`);
          return [];
        }
        if (index < 0 || index >= current.length) {
          console.warn(`Array index ${index} out of bounds for array of length ${current.length}, returning empty array`);
          return [];
        }
        current = current[index];
      } else {
        if (typeof current !== 'object' || !(part in current)) {
          console.warn(`Property '${part}' not found in ${typeof current}, returning empty array`);
          return [];
        }
        current = current[part];
      }
    }

    return current;
  }

  onSelect(event: any) {
    console.log('🎯 onSelect called with event:', event);
    
    if (event && event.item) {
      this.value = event.item[this.metadata!.optionValueKeyInArray];
      this.selectedDisplayText = event.item[this.metadata!.optionDisplayLabelKeyInArray];
      
      console.log('🎯 Selected value:', this.value);
      console.log('🎯 Display text:', this.selectedDisplayText);
      
      // Set the display text without triggering valueChanges
      this.control.setValue(this.selectedDisplayText, { emitEvent: false });
      
      // Update the form control value and mark as valid
      this.onChange(this.value);
      this.onTouched();
      
      // Set selection as valid
      this.isValidSelection = true;
      
      // Mark as touched and update validity
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
      
      // Force change detection to update the UI immediately
      this.cdr.detectChanges();
      
      console.log('🎯 After selection - isValidSelection:', this.isValidSelection, 'isInvalid:', this.isInvalid);
    }
  }

  onInputChange(event: any) {
    const value = event.target.value;
    console.log('🔄 onInputChange called with value:', value);
    
    if (!value) {
      // Empty value - reset everything
      this.value = null;
      this.selectedDisplayText = null;
      this.onChange(null);
      this.isValidSelection = true;
      console.log('🔄 Empty value - resetting selection');
    } else {
      // Check if the current input value still matches the selected value
      this.validateSelection(value);
    }
    
    // Always mark as touched and update validity to trigger error display
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    
    console.log('🔄 After onInputChange - isValidSelection:', this.isValidSelection, 'value:', this.value, 'isInvalid:', this.isInvalid);
  }

  onFocus(): void {
    console.log('🎯 onFocus called');
    this.onTouched();
  }

  onBlur(): void {
    console.log('🎯 onBlur called');
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onTouched();
    
    // Validate on blur to catch any final validation
    if (this.control.value) {
      this.validateSelection(this.control.value);
    }
    
    console.log('🎯 After onBlur - isValidSelection:', this.isValidSelection, 'value:', this.value, 'isInvalid:', this.isInvalid);
  }

  private validateSelection(inputValue: string): void {
    console.log('🔍 validateSelection called with:', inputValue);
    
    if (!inputValue) {
      this.isValidSelection = true;
      this.value = null;
      this.selectedDisplayText = null;
      this.onChange(null);
      return;
    }

    // Check if the current input value still matches the selected value
    if (this.selectedDisplayText) {
      // User had a selection, check if current input still matches
      if (inputValue.length >= 2) {
        // Input is long enough to be a valid search term
        // Check if it's still a valid selection by comparing with the stored selected display text
        if (inputValue === this.selectedDisplayText) {
          // Input still matches the selected display value
          console.log('🔍 Input still matches selection - keeping valid');
          this.isValidSelection = true;
        } else {
          // Input has been modified - no longer a valid selection
          console.log('🔍 Input modified after selection - invalidating selection');
          this.isValidSelection = false;
          this.value = null;
          this.selectedDisplayText = null;
          this.onChange(null);
        }
      } else {
        // Input too short - invalid selection
        console.log('🔍 Input too short - invalidating selection');
        this.isValidSelection = false;
        this.value = null;
        this.selectedDisplayText = null;
        this.onChange(null);
      }
    } else {
      // No previous selection - this means user typed but didn't select from dropdown
      // For validation purposes, this should be considered invalid
      console.log('🔍 No previous selection - user typed but didn\'t select from dropdown');
      this.isValidSelection = false;
      this.value = null;
      this.onChange(null);
    }
    
    console.log('🔍 validateSelection result - isValidSelection:', this.isValidSelection, 'value:', this.value);
  }

  changeTypeaheadLoading(isLoading: boolean) {
    // This is called by ngx-bootstrap when typeahead loading state changes
    console.log('⏳ Typeahead loading state changed:', isLoading);
    console.log('⏳ Previous isLoading state:', this.isLoading);
    this.isLoading = isLoading;
    console.log('⏳ New isLoading state:', this.isLoading);
  }



  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
    if (value && this.metadata) {
      this.control.setValue(value, { emitEvent: false });
      this.isValidSelection = false;
      this.selectedDisplayText = null; // Reset since we don't know the display text
    } else {
      this.control.setValue('', { emitEvent: false });
      this.isValidSelection = true;
      this.selectedDisplayText = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  getErrorMessage(): string | null {
    if (this.control.errors) {
      if (this.control.errors['required']) {
        return `${this.label || 'This field'} is required`;
      }
    }
    
    // Custom validation for invalid selection
    if (!this.isValidSelection && this.control.value && this.control.touched) {
      return `Please select a valid option from the list`;
    }
    
    return null;
  }

  get isInvalid(): boolean {
    return (this.control.invalid || !this.isValidSelection) && (this.control.dirty || this.control.touched);
  }

  clearValue(): void {
    this.value = null;
    this.selectedDisplayText = null;
    this.control.setValue('', { emitEvent: false });
    this.onChange(null);
    this.isValidSelection = true;
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }

  // Debug method to manually trigger search
  debugSearch() {
    console.log('🔍 Debug Search - Current state:');
    console.log('🔍 controlValue:', this.control.value);
    console.log('🔍 isLoading:', this.isLoading);
    console.log('🔍 isValidSelection:', this.isValidSelection);
    console.log('🔍 suggestions$:', this.suggestions$);
    console.log('🔍 control.touched:', this.control.touched);
    console.log('🔍 control.dirty:', this.control.dirty);
    console.log('🔍 control.valid:', this.control.valid);
    console.log('🔍 control.errors:', this.control.errors);
    
    // Test the suggestions observable
    this.suggestions$.subscribe(results => {
      console.log('🔍 suggestions$ emitted:', results);
    });
  }

  // Test method to manually trigger a search
  testSearch(searchTerm: string) {
    console.log('🧪 Testing search with:', searchTerm);
    this.control.setValue(searchTerm);
  }
}
