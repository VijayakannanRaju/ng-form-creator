import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

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
export class Numberbox implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() min?: number;
  @Input() max?: number;

  value: number | null = null;
  isDisabled = false;

  private onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value != null ? value : null;
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.valueAsNumber;
    this.onChange(this.value);
  }
}
