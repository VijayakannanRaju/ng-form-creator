

import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { TimeOnlyMetadata, FormValidationError } from '../../form.type';

@Component({
  selector: 'app-time-only',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './time-only.html',
  styleUrl: './time-only.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeOnly),
      multi: true,
    },
  ],
})
export class TimeOnly implements ControlValueAccessor, OnInit {
  @Input() metadata?: TimeOnlyMetadata;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() minTime?: string;
  @Input() maxTime?: string;
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
      this.minTime = this.metadata.minTime;
      this.maxTime = this.metadata.maxTime;
      this.required = !!this.metadata.required;
    }

    // Validate min/max time configuration
    this.validateTimeRange();

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    
    // Add custom min/max time validators
    validators.push(this.timeRangeValidator.bind(this));
    
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

  validateTimeRange(): void {
    if (this.minTime && this.maxTime) {
      const minTime = this.parseTime(this.minTime);
      const maxTime = this.parseTime(this.maxTime);
      
      if (minTime !== null && maxTime !== null && minTime > maxTime) {
        console.warn(`TimeOnly component: minTime (${this.minTime}) is greater than maxTime (${this.maxTime})`);
      }
    }
  }

  timeRangeValidator(control: FormControl): { [key: string]: any } | null {
    if (!control.value) {
      return null; // Let required validator handle empty values
    }

    const selectedTime = this.parseTime(control.value);

    // Check if selected time is valid
    if (selectedTime === null) {
      return { invalidTime: true };
    }

    // Check min time
    if (this.minTime) {
      const minTime = this.parseTime(this.minTime);
      if (minTime !== null && selectedTime < minTime) {
        return { minTime: { min: this.minTime, actual: control.value } };
      }
    }

    // Check max time
    if (this.maxTime) {
      const maxTime = this.parseTime(this.maxTime);
      if (maxTime !== null && selectedTime > maxTime) {
        return { maxTime: { max: this.maxTime, actual: control.value } };
      }
    }

    return null;
  }

  // Helper method to parse time string (HH:mm) to minutes since midnight
  private parseTime(timeString: string): number | null {
    const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    const match = timeString.match(timeRegex);
    
    if (!match) {
      return null;
    }
    
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    
    return hours * 60 + minutes;
  }

  // Helper method to format minutes to time string (HH:mm)
  private formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  getErrorMessage(): string | null {
    if (this.control.errors) {
      if (this.control.errors['required']) {
        return `${this.label || 'This field'} is required`;
      }
      if (this.control.errors['invalidTime']) {
        return `${this.label || 'This field'} must be a valid time (HH:MM format)`;
      }
      if (this.control.errors['minTime']) {
        if (this.maxTime) {
          return `${this.label || 'This field'} must be between ${this.minTime} and ${this.maxTime}`;
        } else {
          return `${this.label || 'This field'} must be at or after ${this.minTime}`;
        }
      }
      if (this.control.errors['maxTime']) {
        if (this.minTime) {
          return `${this.label || 'This field'} must be between ${this.minTime} and ${this.maxTime}`;
        } else {
          return `${this.label || 'This field'} must be at or before ${this.maxTime}`;
        }
      }
    }
    return null;
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  clearValue(): void {
    this.value = '';
    this.control.setValue('', { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange('');
  }
}

