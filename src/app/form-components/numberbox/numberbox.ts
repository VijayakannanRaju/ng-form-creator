import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NumberboxMetadata, FormValidationError } from '../../form.type';

@Component({
  selector: 'app-numberbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './numberbox.html',
  styleUrl: './numberbox.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Numberbox),
      multi: true
    }
  ]
})
export class Numberbox implements ControlValueAccessor, OnInit {
  @Input() metadata?: NumberboxMetadata;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() required!: boolean;
  @Input() readonly = false;
  @Input() showClearButton = true;
  
  value: number | null = null;
  isDisabled = false;
  isFocused = false;
  control = new FormControl<number | null>(null);

  private onChange = (value: any) => { };
  onTouched = () => { };

  ngOnInit() {
    // If metadata is provided, use it to set up the component
    if (this.metadata) {
      this.label = this.metadata.displayLabel;
      this.placeholder = this.metadata.placeholder;
      this.min = this.metadata.min;
      this.max = this.metadata.max;
      this.required = !!this.metadata.required;
    }

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.min !== undefined) {
      validators.push(Validators.min(this.min));
    }
    if (this.max !== undefined) {
      validators.push(Validators.max(this.max));
    }
    
    this.control.setValidators(validators);
  }

  writeValue(value: any): void {
    this.value = value != null ? value : null;
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
    const newValue = input.valueAsNumber;
    this.value = isNaN(newValue) ? null : newValue;
    this.control.setValue(this.value, { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange(this.value);
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

  getErrorMessage(): string | null {
    if (this.control.errors) {
      if (this.control.errors['required']) {
        return `${this.label || 'This field'} is required`;
      }
      if (this.control.errors['min']) {
        return `${this.label || 'This field'} must be at least ${this.control.errors['min'].min}`;
      }
      if (this.control.errors['max']) {
        return `${this.label || 'This field'} must not exceed ${this.control.errors['max'].max}`;
      }
    }
    return null;
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  clearValue(): void {
    this.value = null;
    this.control.setValue(null, { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange(null);
  }
}
