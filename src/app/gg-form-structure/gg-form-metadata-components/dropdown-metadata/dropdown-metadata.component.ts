import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DropdownMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValidationError } from '../../../form.type';

@Component({
  selector: 'app-dropdown-metadata',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown-metadata.component.html',
  styleUrl: './dropdown-metadata.component.scss',
  standalone: true
})
export class DropdownMetadataComponent implements OnInit, OnDestroy {
  @Input('component') c!: DropdownMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false

  dropdownForm!: FormGroup;
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
    this.dropdownForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      required: [this.c.required || false],
      options: this.fb.array([])
    });

    // Initialize options FormArray
    this.initializeOptionsArray();
  }

  private initializeOptionsArray(): void {
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    optionsArray.clear();

    // If component has options, add them to the form array
    if (this.c.options && this.c.options.length > 0) {
      this.c.options.forEach(option => {
        optionsArray.push(this.createOptionFormGroup(option.value, option.display));
      });
    } else {
      // Add at least one default option
      optionsArray.push(this.createOptionFormGroup('', ''));
    }
  }

  private createOptionFormGroup(value: any = '', display: string = ''): FormGroup {
    return this.fb.group({
      value: [value, [Validators.required]],
      display: [display, [Validators.required]]
    });
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.dropdownForm.valueChanges.subscribe(formValues => {
      // Update the component object in real-time
      this.c.name = formValues.name;
      this.c.displayLabel = formValues.displayLabel;
      this.c.required = formValues.required;

      // Update options array from form array
      this.c.options = formValues.options.map((option: any) => ({
        value: option.value,
        display: option.display
      }));

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
    const displayLabelControl = this.dropdownForm.get('displayLabel');
    const displayLabel = displayLabelControl?.value;
    if (!displayLabel || displayLabel.trim() === '') {
      errors.push({
        field: 'displayLabel',
        message: 'Display label is required',
        type: 'required'
      });
    }

    // Check options array (must have at least one option)
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    if (optionsArray.length === 0) {
      errors.push({
        field: 'options',
        message: 'At least one option is required',
        type: 'required'
      });
    }

    // Check each option for required fields
    optionsArray.controls.forEach((optionControl, index) => {
      const value = optionControl.get('value')?.value;
      const display = optionControl.get('display')?.value;

      if (!value || value.toString().trim() === '') {
        errors.push({
          field: `options[${index}].value`,
          message: `Option ${index + 1} value is required`,
          type: 'required'
        });
      }

      if (!display || display.trim() === '') {
        errors.push({
          field: `options[${index}].display`,
          message: `Option ${index + 1} display text is required`,
          type: 'required'
        });
      }
    });

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
    const nameValue = this.dropdownForm.get('name')?.value;
    if (!nameValue || nameValue.trim() === '') {
      // If name is empty, set it to displayName
      this.dropdownForm.patchValue({ name: this.c.displayName });
    }
    this.showNameInput = false;
  }

  // Options FormArray methods
  get optionsArray(): FormArray {
    return this.dropdownForm.get('options') as FormArray;
  }

  addOption(): void {
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    optionsArray.push(this.createOptionFormGroup());
  }

  removeOption(index: number): void {
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    if (optionsArray.length > 1) {
      optionsArray.removeAt(index);
    }
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.dropdownForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  isOptionFieldInvalid(optionIndex: number, fieldName: string): boolean {
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    const optionControl = optionsArray.at(optionIndex);
    const field = optionControl.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  isFieldRequired(fieldName: string): boolean {
    const field = this.dropdownForm.get(fieldName);
    return field ? field.hasError('required') : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.dropdownForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  getOptionFieldError(optionIndex: number, fieldName: string): string {
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    const optionControl = optionsArray.at(optionIndex);
    const field = optionControl.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  // Check if form has errors regardless of interaction state (for exclamation icon)
  hasFormErrors(): boolean {
    return this.dropdownForm.invalid;
  }

  // Check if options array has errors
  hasOptionsErrors(): boolean {
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    return optionsArray.invalid || optionsArray.length === 0;
  }

  // Helper method to get options error message
  getOptionsError(): string {
    const optionsArray = this.dropdownForm.get('options') as FormArray;
    if (optionsArray.length === 0) {
      return 'At least one option is required';
    }
    return 'All options must have both value and display text';
  }
}

