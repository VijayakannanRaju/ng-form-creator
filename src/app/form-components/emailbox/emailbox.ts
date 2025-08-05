import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { EmailboxMetadata, FormValidationError } from '../../form.type';

@Component({
  selector: 'app-emailbox',
  templateUrl: './emailbox.html',
  styleUrl: './emailbox.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Emailbox),
      multi: true
    }
  ],
})
export class Emailbox implements ControlValueAccessor, OnInit {
  @Input() metadata?: EmailboxMetadata;
  @Input() label?: string;
  @Input() placeholder?: string;
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
      this.required = !!this.metadata.required;
    }

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    validators.push(Validators.email);
    
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
        return `${this.label || 'Email'} is required`;
      }
      if (this.control.errors['email']) {
        return `Please enter a valid email address`;
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
