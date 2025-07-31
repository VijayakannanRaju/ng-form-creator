import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

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
export class CheckboxMulti implements ControlValueAccessor {
  @Input() label?: string;
  @Input() options: { value: any; display: string }[] = [];

  value: any[] = [];
  isDisabled = false;

  private onChange = (val: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  toggleValue(optionValue: any): void {
    const idx = this.value.indexOf(optionValue);
    if (idx === -1) {
      this.value = [...this.value, optionValue];
    } else {
      this.value = this.value.filter(v => v !== optionValue);
    }
    this.onChange(this.value);
    this.onTouched();
  }

  isChecked(optionValue: any): boolean {
    return this.value.includes(optionValue);
  }
}
