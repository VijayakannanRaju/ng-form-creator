import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateTimeMetadata, FormValidationError } from '../../form.type';

@Component({
  selector: 'app-datetime',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './datetime.html',
  styleUrl: './datetime.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datetime),
      multi: true,
    },
  ],
})
export class Datetime implements ControlValueAccessor, OnInit {
  @Input() metadata?: DateTimeMetadata;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() required!: boolean;
  @Input() readonly = false;
  @Input() showClearButton = true;
  
  value: string = '';
  isDisabled = false;
  isFocused = false;
  control = new FormControl('');

  private onChange = (value: any) => { };
  onTouched = () => { };

  ngOnInit() {
    // If metadata is provided, use it to set up the component
    if (this.metadata) {
      this.label = this.metadata.displayLabel;
      this.placeholder = this.metadata.placeholder;
      this.minDate = this.metadata.minDate;
      this.maxDate = this.metadata.maxDate;
      this.required = !!this.metadata.required;
    }

    // Validate min/max date configuration
    this.validateDateRange();

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    
    // Add custom min/max date validators
    validators.push(this.dateRangeValidator.bind(this));
    
    this.control.setValidators(validators);
  }

  writeValue(value: any): void {
    this.value = value || '';
    this.control.setValue(this.value, { emitEvent: false });
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.control.setValue(this.value, { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange(this.value);
    this.onTouched();
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
  }

  validateDateRange(): void {
    if (this.minDate && this.maxDate) {
      const minDate = new Date(this.minDate);
      const maxDate = new Date(this.maxDate);
      
      if (!isNaN(minDate.getTime()) && !isNaN(maxDate.getTime()) && minDate > maxDate) {
        console.warn(`Datetime component: minDate (${this.minDate}) is greater than maxDate (${this.maxDate})`);
      }
    }
  }

  dateRangeValidator(control: FormControl): { [key: string]: any } | null {
    if (!control.value) {
      return null; // Let required validator handle empty values
    }

    const selectedDate = new Date(control.value);
    const now = new Date();

    // Check if selected date is valid
    if (isNaN(selectedDate.getTime())) {
      return { invalidDate: true };
    }

    // Check min date
    if (this.minDate) {
      const minDate = new Date(this.minDate);
      if (selectedDate < minDate) {
        return { minDate: { min: this.minDate, actual: control.value } };
      }
    }

    // Check max date
    if (this.maxDate) {
      const maxDate = new Date(this.maxDate);
      if (selectedDate > maxDate) {
        return { maxDate: { max: this.maxDate, actual: control.value } };
      }
    }

    return null;
  }

  getErrorMessage(): string | null {
    if (this.control.errors) {
      if (this.control.errors['required']) {
        return `${this.label || 'This field'} is required`;
      }
      if (this.control.errors['invalidDate']) {
        return `${this.label || 'This field'} must be a valid date and time`;
      }
      if (this.control.errors['minDate']) {
        const minDate = new Date(this.minDate!);
        const formattedMinDate = minDate.toLocaleDateString() + ' ' + minDate.toLocaleTimeString();
        return `${this.label || 'This field'} must be on or after ${formattedMinDate}`;
      }
      if (this.control.errors['maxDate']) {
        const maxDate = new Date(this.maxDate!);
        const formattedMaxDate = maxDate.toLocaleDateString() + ' ' + maxDate.toLocaleTimeString();
        return `${this.label || 'This field'} must be on or before ${formattedMaxDate}`;
      }
    }
    return null;
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  // Helper method to format date for HTML input attributes
  getFormattedMinDate(): string | undefined {
    if (!this.minDate) return undefined;
    const date = new Date(this.minDate);
    if (isNaN(date.getTime())) return undefined;
    
    // Format as YYYY-MM-DDTHH:mm for datetime-local input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getFormattedMaxDate(): string | undefined {
    if (!this.maxDate) return undefined;
    const date = new Date(this.maxDate);
    if (isNaN(date.getTime())) return undefined;
    
    // Format as YYYY-MM-DDTHH:mm for datetime-local input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  clearValue(): void {
    this.value = '';
    this.control.setValue('', { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange('');
  }
}
