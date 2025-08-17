import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TypeAheadWithHttpCallMetadata, FormValidationError } from '../../form.type';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-typeahead-with-http-call',
  templateUrl: './typeahead-with-http-call.component.html',
  styleUrl: './typeahead-with-http-call.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TypeaheadModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeaheadWithHttpCallComponent),
      multi: true
    }
  ],
})
export class TypeaheadWithHttpCallComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() metadata?: TypeAheadWithHttpCallMetadata;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() required!: boolean;
  @Input() readonly = false;
  @Input() disabled = false;

  value: any = null;
  isDisabled = false;
  isFocused = false;
  control = new FormControl('');
  allData: any[] = [];
  isLoading = false;
  isValidSelection = true; // Track if the current input value is a valid selection
  
  private destroy$ = new Subject<void>();
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.metadata) {
      this.label = this.metadata.displayLabel;
      this.placeholder = this.metadata.placeholder || 'Start typing to search...';
      this.required = !!this.metadata.required;
    }

    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }

    this.control.setValidators(validators);
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch() {
    if (!this.metadata) return;
    this.loadData();
  }

  private loadData() {
    if (!this.metadata?.httpCallUrl) return;

    this.isLoading = true;
    this.control.disable();

    this.http.get<any>(this.metadata.httpCallUrl)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Typeahead data loading error:', error);
          this.isLoading = false;
          this.control.enable();
          return of([]);
        })
      )
      .subscribe(results => {
        this.isLoading = false;
        this.allData = this.processSearchResults(results);
        this.control.enable();
      });
  }

  private processSearchResults(results: any): any[] {
    if (!this.metadata) {
      return [];
    }

    let dataArray: any = results;
    
    if (this.metadata.arrayInResponsePath && this.metadata.arrayInResponsePath.trim() !== '') {
      try {
        dataArray = this.extractArrayFromPath(results, this.metadata.arrayInResponsePath);
      } catch (error) {
        console.error('Error extracting array from path:', error);
        return [];
      }
    }

    if (!Array.isArray(dataArray)) {
      console.warn('Extracted data is not an array:', dataArray);
      return [];
    }

    return dataArray;
  }

  private extractArrayFromPath(data: any, path: string): any {
    if (!path || path.trim() === '') {
      return data;
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
        throw new Error(`Path part '${part}' is null/undefined`);
      }

      if (part.startsWith('[') && part.endsWith(']')) {
        const index = parseInt(part.slice(1, -1));
        if (!Array.isArray(current)) {
          throw new Error(`Expected array at '${part}', got ${typeof current}`);
        }
        if (index < 0 || index >= current.length) {
          throw new Error(`Array index ${index} out of bounds for array of length ${current.length}`);
        }
        current = current[index];
      } else {
        if (typeof current !== 'object' || !(part in current)) {
          throw new Error(`Property '${part}' not found in ${typeof current}`);
        }
        current = current[part];
      }
    }

    return current;
  }

  onSelect(event: any) {
    if (event && event.item) {
      this.value = event.item[this.metadata!.optionValueKeyInArray];
      const displayText = event.item[this.metadata!.optionDisplayLabelKeyInArray];
      this.control.setValue(displayText, { emitEvent: false });
      this.onChange(this.value);
      this.onTouched();
      this.isValidSelection = true; // Valid selection made
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
  }

  onInputChange(event: any) {
    const value = event.target.value;
    this.control.setValue(value, { emitEvent: false });
    
    if (!value) {
      this.value = null;
      this.onChange(null);
      this.isValidSelection = true; // Empty value is valid
    } else {
      // Check if the current input value matches any item in the dropdown
      this.validateSelection(value);
    }
    
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }

  private validateSelection(inputValue: string): void {
    if (!inputValue || !this.allData.length) {
      this.isValidSelection = true;
      return;
    }

    // Check if the input value exactly matches any display value in the dropdown
    const exactMatch = this.allData.some(item => {
      const displayValue = item[this.metadata!.optionDisplayLabelKeyInArray];
      return displayValue && displayValue.toString().toLowerCase() === inputValue.toLowerCase();
    });

    this.isValidSelection = exactMatch;
    
    // If it's a valid selection, update the actual value
    if (exactMatch) {
      const matchedItem = this.allData.find(item => {
        const displayValue = item[this.metadata!.optionDisplayLabelKeyInArray];
        return displayValue && displayValue.toString().toLowerCase() === inputValue.toLowerCase();
      });
      if (matchedItem) {
        this.value = matchedItem[this.metadata!.optionValueKeyInArray];
        this.onChange(this.value);
      }
    } else {
      // Invalid selection, clear the actual value
      this.value = null;
      this.onChange(null);
    }
  }

  onFocus(): void {
    this.isFocused = true;
    this.onTouched();
  }

  onBlur(): void {
    this.isFocused = false;
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onTouched();
    
    // Validate on blur to catch any final validation
    if (this.control.value) {
      this.validateSelection(this.control.value);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
    if (value && this.metadata) {
      const result = this.allData.find(item => 
        item[this.metadata!.optionValueKeyInArray] === value
      );
      if (result) {
        const displayText = result[this.metadata!.optionDisplayLabelKeyInArray];
        this.control.setValue(displayText, { emitEvent: false });
        this.isValidSelection = true;
      } else {
        this.control.setValue(value, { emitEvent: false });
        this.isValidSelection = false;
      }
    } else {
      this.control.setValue('', { emitEvent: false });
      this.isValidSelection = true;
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
    this.control.setValue('', { emitEvent: false });
    this.onChange(null);
    this.isValidSelection = true;
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }
}
