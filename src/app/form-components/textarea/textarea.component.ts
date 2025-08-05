import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TextAreaMetadata, FormValidationError } from '../../form.type';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true
    }
  ],
})
export class Textarea implements ControlValueAccessor, OnInit {
  @Input() metadata?: TextAreaMetadata;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() required!: boolean;
  @Input() rows?: number;
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
      this.maxLength = this.metadata.maxLength;
      this.minLength = this.metadata.minLength;
      this.required = !!this.metadata.required;
      this.rows = this.metadata.rows || 4; // Default to 4 rows if not specified
    }

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.minLength !== undefined) {
      validators.push(Validators.minLength(this.minLength));
    }
    if (this.maxLength !== undefined) {
      validators.push(Validators.maxLength(this.maxLength));
    }
    
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
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
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
      if (this.control.errors['minlength']) {
        return `${this.label || 'This field'} must be at least ${this.control.errors['minlength'].requiredLength} characters`;
      }
      if (this.control.errors['maxlength']) {
        return `${this.label || 'This field'} must not exceed ${this.control.errors['maxlength'].requiredLength} characters`;
      }
    }
    return null;
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get characterCount(): number {
    return this.value?.length || 0;
  }

  clearValue(): void {
    this.value = '';
    this.control.setValue('', { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange('');
  }
}