import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateTimeMetadata, FormValidationError } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time-metadata',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './date-time-metadata.component.html',
  styleUrl: './date-time-metadata.component.scss',
  standalone: true
})
export class DateTimeMetadataComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input('component') c!: DateTimeMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false;
  dateTimeForm!: FormGroup;
  private formSubscription?: Subscription;
  private isUpdatingErrors = false;

  constructor(
    private fb: FormBuilder,
    public inputComponentDragService: InputComponentDragService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormSubscription();
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked(): void {
    if (this.showNameInput && this.nameInputRef) {
      this.nameInputRef.nativeElement.focus();
    }
  }

  private initializeForm(): void {
    this.dateTimeForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      placeholder: [this.c.placeholder || ''],
      required: [this.c.required || false],
      minDate: [this.c.minDate || ''],
      maxDate: [this.c.maxDate || '']
    });
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.dateTimeForm.valueChanges.subscribe(value => {
      if (!this.isUpdatingErrors) {
        this.updateComponentData(value);
      }
    });
  }

  private updateComponentData(formValue: any): void {
    this.c.name = formValue.name;
    this.c.displayLabel = formValue.displayLabel;
    this.c.placeholder = formValue.placeholder;
    this.c.required = formValue.required;
    this.c.minDate = formValue.minDate;
    this.c.maxDate = formValue.maxDate;

    this.updateErrors();
  }

  private updateErrors(): void {
    this.isUpdatingErrors = true;
    this.c.errors = [];

    // Check form-level errors
    if (this.dateTimeForm.errors) {
      Object.keys(this.dateTimeForm.errors).forEach(errorKey => {
        this.c.errors!.push({
          field: 'form',
          message: this.getErrorMessage(errorKey, this.dateTimeForm.errors![errorKey]),
          type: 'custom'
        });
      });
    }

    // Check individual field errors
    Object.keys(this.dateTimeForm.controls).forEach(controlName => {
      const control = this.dateTimeForm.get(controlName);
      if (control && control.errors && control.dirty) {
        Object.keys(control.errors).forEach(errorKey => {
          this.c.errors!.push({
            field: controlName,
            message: this.getErrorMessage(errorKey, control.errors![errorKey]),
            type: errorKey as any
          });
        });
      }
    });

    // Check date range validation
    this.validateDateRange();

    this.isUpdatingErrors = false;
    this.cdr.detectChanges();
  }

  private validateDateRange(): void {
    const minDate = this.dateTimeForm.get('minDate')?.value;
    const maxDate = this.dateTimeForm.get('maxDate')?.value;

    if (minDate && maxDate && new Date(minDate) > new Date(maxDate)) {
      this.c.errors!.push({
        field: 'dateRange',
        message: 'Minimum date cannot be greater than maximum date',
        type: 'custom'
      });
    }
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `Minimum length is ${errorValue.requiredLength} characters`;
      case 'maxlength':
        return `Maximum length is ${errorValue.requiredLength} characters`;
      case 'min':
        return `Minimum value is ${errorValue.min}`;
      case 'max':
        return `Maximum value is ${errorValue.max}`;
      case 'email':
        return 'Please enter a valid email address';
      case 'pattern':
        return 'Please enter a valid format';
      default:
        return 'Invalid value';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.dateTimeForm.get(fieldName);
    return !!(field && field.invalid && field.dirty);
  }

  getFieldError(fieldName: string): string {
    const field = this.dateTimeForm.get(fieldName);
    if (field && field.errors) {
      const errorKey = Object.keys(field.errors)[0];
      return this.getErrorMessage(errorKey, field.errors[errorKey]);
    }
    return '';
  }

  hasFormErrors(): boolean {
    return this.c.errors ? this.c.errors.length > 0 : false;
  }

  hasDateRangeError(): boolean {
    const minDate = this.dateTimeForm.get('minDate')?.value;
    const maxDate = this.dateTimeForm.get('maxDate')?.value;
    return !!(minDate && maxDate && new Date(minDate) > new Date(maxDate));
  }

  getDateRangeError(): string {
    return 'Minimum date cannot be greater than maximum date';
  }

  onNameClick(): void {
    this.showNameInput = true;
  }

  onNameFocusOut(): void {
    const nameValue = this.dateTimeForm.get('name')?.value;
    if (!nameValue || nameValue.trim() === '') {
      // If name is empty, set it to displayLabel
      this.dateTimeForm.patchValue({ name: this.c.displayLabel });
    }
    this.showNameInput = false;
  }

  // Helper method to get current date in ISO format for min/max date inputs
  getCurrentDateISO(): string {
    return new Date().toISOString().split('T')[0];
  }
}
