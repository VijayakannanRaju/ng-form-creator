import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TextboxMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValidationError } from '../../../form.type';

@Component({
  selector: 'app-textbox-metadata',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './textbox-metadata.component.html',
  styleUrl: './textbox-metadata.component.scss',
  standalone: true
})
export class TextboxMetadataComponent implements OnInit, OnDestroy {
  @Input('component') c!: TextboxMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false

  textboxForm!: FormGroup;
  private formSubscription?: Subscription;
  private isUpdatingErrors = false; // Flag to prevent infinite recursion

  constructor(
    public inputComponentDragService: InputComponentDragService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormSubscription();

    // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.updateErrors(); // Initialize errors array immediately
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.textboxForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      placeholder: [this.c.placeholder || ''],
      maxLength: [this.c.maxLength || null, [Validators.min(1)]],
      minLength: [this.c.minLength || null, [Validators.min(1)]],
      required: [this.c.required || false],
      // Responsive width controls
      containerWidthInLargeScreen: [this.c.containerWidthInLargeScreen || 'full-width'],
      containerWidthInMediumScreen: [this.c.containerWidthInMediumScreen || 'full-width'],
      containerWidthInSmallScreen: [this.c.containerWidthInSmallScreen || 'full-width'],
      componentWidthInLargeScreen: [this.c.componentWidthInLargeScreen || 12],
      componentWidthInMediumScreen: [this.c.componentWidthInMediumScreen || 12],
      componentWidthInSmallScreen: [this.c.componentWidthInSmallScreen || 12]
    }, { validators: this.lengthValidation });
  }

  // Custom validator to ensure minLength <= maxLength
  private lengthValidation(control: AbstractControl): ValidationErrors | null {
    const minLength = control.get('minLength')?.value;
    const maxLength = control.get('maxLength')?.value;

    if (minLength && maxLength && minLength > maxLength) {
      return { lengthMismatch: true };
    }

    return null;
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.textboxForm.valueChanges.subscribe(formValues => {
      // Update the component object in real-time
      this.c.name = formValues.name;
      this.c.displayLabel = formValues.displayLabel;
      this.c.placeholder = formValues.placeholder;
      this.c.maxLength = formValues.maxLength;
      this.c.minLength = formValues.minLength;
      this.c.required = formValues.required;
      
      // Update responsive width properties
      this.c.containerWidthInLargeScreen = formValues.containerWidthInLargeScreen;
      this.c.containerWidthInMediumScreen = formValues.containerWidthInMediumScreen;
      this.c.containerWidthInSmallScreen = formValues.containerWidthInSmallScreen;
      this.c.componentWidthInLargeScreen = formValues.componentWidthInLargeScreen;
      this.c.componentWidthInMediumScreen = formValues.componentWidthInMediumScreen;
      this.c.componentWidthInSmallScreen = formValues.componentWidthInSmallScreen;

      // Update errors array based on form validation (only if not already updating)
      if (!this.isUpdatingErrors) {
        setTimeout(() => {
          this.updateErrors();
        }, 0);
      }
    });
  }

  private updateErrors(): void {
    if (this.isUpdatingErrors) return; // Prevent recursive calls

    this.isUpdatingErrors = true;

    const errors: FormValidationError[] = [];

    // Check displayLabel field (required)
    const displayLabelControl = this.textboxForm.get('displayLabel');
    const displayLabel = displayLabelControl?.value;
    if (!displayLabel || displayLabel.trim() === '') {
      errors.push({
        field: 'displayLabel',
        message: 'Display label is required',
        type: 'required'
      });
    }

    // Check minLength field (must be > 0 if provided)
    const minLengthControl = this.textboxForm.get('minLength');
    const minLength = minLengthControl?.value;
    if (minLength !== null && minLength !== undefined && minLength <= 0) {
      errors.push({
        field: 'minLength',
        message: 'Minimum length must be greater than 0',
        type: 'min'
      });
    }

    // Check maxLength field (must be > 0 if provided)
    const maxLengthControl = this.textboxForm.get('maxLength');
    const maxLength = maxLengthControl?.value;
    if (maxLength !== null && maxLength !== undefined && maxLength <= 0) {
      errors.push({
        field: 'maxLength',
        message: 'Maximum length must be greater than 0',
        type: 'min'
      });
    }

    // Check length validation (minLength <= maxLength)
    if (this.textboxForm.hasError('lengthMismatch')) {
      errors.push({
        field: 'lengthValidation',
        message: 'Minimum length must be less than or equal to maximum length',
        type: 'custom'
      });
    }

    // Update the component's errors array
    this.c.errors = errors;
    console.log('Updated errors for component:', this.c.id, errors);

    // Trigger change detection
    this.cdr.detectChanges();

    this.isUpdatingErrors = false;
  }

  ngAfterViewChecked(): void {
    if (this.showNameInput && this.nameInputRef) {
      this.nameInputRef.nativeElement.focus();
    }
  }

  onNameClick(): void {
    this.showNameInput = true;
  }

  onNameFocusOut(): void {
    const nameValue = this.textboxForm.get('name')?.value;
    if (!nameValue || nameValue.trim() === '') {
      // If name is empty, set it to displayName
      this.textboxForm.patchValue({ name: this.c.displayName });
    }
    this.showNameInput = false;
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.textboxForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  isFieldRequired(fieldName: string): boolean {
    const field = this.textboxForm.get(fieldName);
    return field ? field.hasError('required') : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.textboxForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    if (field?.hasError('min')) {
      return 'Value must be greater than 0';
    }
    return '';
  }

  // Check if form has errors regardless of interaction state (for exclamation icon)
  hasFormErrors(): boolean {
    return this.textboxForm.invalid;
  }

  // Helper method to check if length validation has error
  hasLengthValidationError(): boolean {
    return this.textboxForm.hasError('lengthMismatch');
  }

  // Helper method to get length validation error message
  getLengthValidationError(): string {
    return 'Minimum length must be less than or equal to maximum length';
  }
}
