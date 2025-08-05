import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CheckboxSingleMetadata, FormValidationError } from '../../form.type';

@Component({
  selector: 'app-checkbox-single',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox-single.html',
  styleUrl: './checkbox-single.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxSingle),
      multi: true
    }
  ]
})
export class CheckboxSingle implements ControlValueAccessor, OnInit {
  @Input() metadata?: CheckboxSingleMetadata;
  @Input() label?: string;
  @Input() required!: boolean;
  @Input() readonly = false;
  @Input() showClearButton = true;
  
  value: any = null;
  isDisabled = false;
  isFocused = false;
  control = new FormControl<any>(null);
  selectedOption: { value: any; display: string } | null = null;

  private onChange = (val: any) => { };
  onTouched = () => { };

  ngOnInit() {
    // If metadata is provided, use it to set up the component
    if (this.metadata) {
      this.label = this.metadata.displayLabel;
      this.required = !!this.metadata.required;
      // For single checkbox, use the first option
      if (this.metadata.options && this.metadata.options.length > 0) {
        this.selectedOption = this.metadata.options[0];
      }
    }

    // Set up validators
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    
    this.control.setValidators(validators);
  }

  writeValue(value: any): void {
    this.value = value;
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

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked && this.selectedOption) {
      this.value = this.selectedOption.value;
    } else {
      this.value = null;
    }
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
    this.value = null;
    this.control.setValue(null, { emitEvent: false });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.onChange(null);
  }
}
