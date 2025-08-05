import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RadioGroupMetadata, FormValidationError } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-group-metadata',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './radio-group-metadata.component.html',
  styleUrl: './radio-group-metadata.component.scss',
  standalone: true
})
export class RadioGroupMetadataComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input('component') c!: RadioGroupMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false;
  radioGroupForm!: FormGroup;
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
    this.radioGroupForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      required: [this.c.required || false],
      options: this.fb.array([]) // FormArray for options
    });
    this.initializeOptionsArray();
  }

  private initializeOptionsArray(): void {
    const optionsArray = this.radioGroupForm.get('options') as FormArray;
    optionsArray.clear();

    if (this.c.options && this.c.options.length > 0) {
      this.c.options.forEach(option => {
        optionsArray.push(this.createOptionFormGroup(option.value, option.display));
      });
    } else {
      // Add at least one default option
      optionsArray.push(this.createOptionFormGroup());
    }
  }

  private createOptionFormGroup(value: any = '', display: string = ''): FormGroup {
    return this.fb.group({
      value: [value, [Validators.required]],
      display: [display, [Validators.required]]
    });
  }

  get optionsArray(): FormArray {
    return this.radioGroupForm.get('options') as FormArray;
  }

  addOption(): void {
    this.optionsArray.push(this.createOptionFormGroup());
  }

  removeOption(index: number): void {
    if (this.optionsArray.length > 1) { // Ensure at least one option remains
      this.optionsArray.removeAt(index);
    }
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.radioGroupForm.valueChanges.subscribe(value => {
      if (!this.isUpdatingErrors) {
        this.updateComponentData(value);
      }
    });
  }

  private updateComponentData(formValue: any): void {
    this.c.name = formValue.name;
    this.c.displayLabel = formValue.displayLabel;
    this.c.required = formValue.required;
    
    // Update options array
    this.c.options = formValue.options.map((option: any) => ({
      value: option.value,
      display: option.display
    }));

    this.updateErrors();
  }

  private updateErrors(): void {
    this.isUpdatingErrors = true;
    this.c.errors = [];

    // Check form-level errors
    if (this.radioGroupForm.errors) {
      Object.keys(this.radioGroupForm.errors).forEach(errorKey => {
        this.c.errors!.push({
          field: 'form',
          message: this.getErrorMessage(errorKey, this.radioGroupForm.errors![errorKey]),
          type: 'custom'
        });
      });
    }

    // Check individual field errors
    Object.keys(this.radioGroupForm.controls).forEach(controlName => {
      const control = this.radioGroupForm.get(controlName);
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

    // Check options validation
    if (this.optionsArray.length === 0) {
      this.c.errors.push({
        field: 'options',
        message: 'At least one option is required',
        type: 'custom'
      });
    }

    this.isUpdatingErrors = false;
    this.cdr.detectChanges();
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
    const field = this.radioGroupForm.get(fieldName);
    return !!(field && field.invalid && field.dirty);
  }

  getFieldError(fieldName: string): string {
    const field = this.radioGroupForm.get(fieldName);
    if (field && field.errors) {
      const errorKey = Object.keys(field.errors)[0];
      return this.getErrorMessage(errorKey, field.errors[errorKey]);
    }
    return '';
  }

  isOptionFieldInvalid(optionIndex: number, fieldName: string): boolean {
    const option = this.optionsArray.at(optionIndex);
    const field = option.get(fieldName);
    return !!(field && field.invalid && field.dirty);
  }

  getOptionFieldError(optionIndex: number, fieldName: string): string {
    const option = this.optionsArray.at(optionIndex);
    const field = option.get(fieldName);
    if (field && field.errors) {
      const errorKey = Object.keys(field.errors)[0];
      return this.getErrorMessage(errorKey, field.errors[errorKey]);
    }
    return '';
  }

  hasFormErrors(): boolean {
    return this.c.errors ? this.c.errors.length > 0 : false;
  }

  hasOptionsErrors(): boolean {
    return this.optionsArray.length === 0 || 
           this.optionsArray.controls.some(control => control.invalid);
  }

  getOptionsError(): string {
    if (this.optionsArray.length === 0) {
      return 'At least one option is required';
    }
    return 'Please fill in all required option fields';
  }

  onNameClick(): void {
    this.showNameInput = true;
  }

  onNameFocusOut(): void {
    const nameValue = this.radioGroupForm.get('name')?.value;
    if (!nameValue || nameValue.trim() === '') {
      // If name is empty, set it to displayLabel
      this.radioGroupForm.patchValue({ name: this.c.displayLabel });
    }
    this.showNameInput = false;
  }
}
