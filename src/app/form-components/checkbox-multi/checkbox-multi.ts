import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CheckboxMultiMetadata, FormValidationError } from '../../form.type';

@Component({
  selector: 'app-checkbox-multi',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox-multi.html',
  styleUrl: './checkbox-multi.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxMulti),
      multi: true
    }
  ]
})
export class CheckboxMulti implements ControlValueAccessor, OnInit {
  @Input() metadata?: CheckboxMultiMetadata;
  @Input() label?: string;
  @Input() options: { value: any; display: string }[] = [];
  @Input() required!: boolean;
  @Input() readonly = false;
  @Input() showClearButton = true;
  
  value: any[] = [];
  isDisabled = false;
  isFocused = false;
  control = new FormControl<any[]>([]);

  private onChange = (val: any) => { };
  onTouched = () => { };

  ngOnInit() {
    // If metadata is provided, use it to set up the component
    if (this.metadata) {
      this.label = this.metadata.displayLabel;
      this.options = this.metadata.options;
      this.required = !!this.metadata.required;
    }

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    
    this.control.setValidators(validators);
  }

  writeValue(value: any): void {
    this.value = value || [];
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

  toggleValue(optionValue: any): void {
    const idx = this.value.indexOf(optionValue);
    if (idx === -1) {
      this.value = [...this.value, optionValue];
    } else {
      this.value = this.value.filter(v => v !== optionValue);
    }
    this.control.setValue(this.value, { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange(this.value);
    this.onTouched();
  }

  isChecked(optionValue: any): boolean {
    return this.value.includes(optionValue);
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
    }
    return null;
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  clearValue(): void {
    this.value = [];
    this.control.setValue([], { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange([]);
  }
}
