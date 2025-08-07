import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeOnlyMetadata, FormValidationError } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-only-metadata',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './time-only-metadata.component.html',
  styleUrl: './time-only-metadata.component.scss',
  standalone: true
})
export class TimeOnlyMetadataComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input('component') c!: TimeOnlyMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false;
  timeOnlyForm!: FormGroup;
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
    this.timeOnlyForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      placeholder: [this.c.placeholder || ''],
      required: [this.c.required || false],
      minTime: [this.c.minTime || ''],
      maxTime: [this.c.maxTime || ''],
      containerWidthInLargeScreen: [this.c.containerWidthInLargeScreen || 'full-width'],
      containerWidthInMediumScreen: [this.c.containerWidthInMediumScreen || 'full-width'],
      containerWidthInSmallScreen: [this.c.containerWidthInSmallScreen || 'full-width'],
      componentWidthInLargeScreen: [this.c.componentWidthInLargeScreen || 12],
      componentWidthInMediumScreen: [this.c.componentWidthInMediumScreen || 12],
      componentWidthInSmallScreen: [this.c.componentWidthInSmallScreen || 12]
    });
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.timeOnlyForm.valueChanges.subscribe(value => {
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
    this.c.minTime = formValue.minTime;
    this.c.maxTime = formValue.maxTime;
    this.c.containerWidthInLargeScreen = formValue.containerWidthInLargeScreen;
    this.c.containerWidthInMediumScreen = formValue.containerWidthInMediumScreen;
    this.c.containerWidthInSmallScreen = formValue.containerWidthInSmallScreen;
    this.c.componentWidthInLargeScreen = formValue.componentWidthInLargeScreen;
    this.c.componentWidthInMediumScreen = formValue.componentWidthInMediumScreen;
    this.c.componentWidthInSmallScreen = formValue.componentWidthInSmallScreen;

    this.updateErrors();
  }

  private updateErrors(): void {
    this.isUpdatingErrors = true;
    this.c.errors = [];

    // Check form-level errors
    if (this.timeOnlyForm.errors) {
      Object.keys(this.timeOnlyForm.errors).forEach(errorKey => {
        this.c.errors!.push({
          field: 'form',
          message: this.getErrorMessage(errorKey, this.timeOnlyForm.errors![errorKey]),
          type: 'custom'
        });
      });
    }

    // Check individual field errors
    Object.keys(this.timeOnlyForm.controls).forEach(controlName => {
      const control = this.timeOnlyForm.get(controlName);
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

    // Check time range validation
    this.validateTimeRange();

    this.isUpdatingErrors = false;
    this.cdr.detectChanges();
  }

  private validateTimeRange(): void {
    const minTime = this.timeOnlyForm.get('minTime')?.value;
    const maxTime = this.timeOnlyForm.get('maxTime')?.value;

    if (minTime && maxTime && minTime > maxTime) {
      this.c.errors!.push({
        field: 'timeRange',
        message: 'Minimum time cannot be greater than maximum time',
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
    const field = this.timeOnlyForm.get(fieldName);
    return !!(field && field.invalid && field.dirty);
  }

  getFieldError(fieldName: string): string {
    const field = this.timeOnlyForm.get(fieldName);
    if (field && field.errors) {
      const errorKey = Object.keys(field.errors)[0];
      return this.getErrorMessage(errorKey, field.errors[errorKey]);
    }
    return '';
  }

  hasFormErrors(): boolean {
    return this.c.errors ? this.c.errors.length > 0 : false;
  }

  hasTimeRangeError(): boolean {
    const minTime = this.timeOnlyForm.get('minTime')?.value;
    const maxTime = this.timeOnlyForm.get('maxTime')?.value;
    return !!(minTime && maxTime && minTime > maxTime);
  }

  getTimeRangeError(): string {
    return 'Minimum time cannot be greater than maximum time';
  }

  onNameClick(): void {
    this.showNameInput = true;
  }

  onNameFocusOut(): void {
    const nameValue = this.timeOnlyForm.get('name')?.value;
    if (!nameValue || nameValue.trim() === '') {
      // If name is empty, set it to displayLabel
      this.timeOnlyForm.patchValue({ name: this.c.displayLabel });
    }
    this.showNameInput = false;
  }

  // Helper method to get current time in HH:mm format for min/max time inputs
  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Returns HH:mm format
  }
}
