import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormArrayMetadata, FormValidationError } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-array-metadata',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-array-metadata.component.html',
  styleUrl: './form-array-metadata.component.scss',
  standalone: true
})
export class FormArrayMetadataComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input('component') c!: FormArrayMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false;
  formArrayForm!: FormGroup;
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
      this.showNameInput = false;
    }
  }

  private initializeForm(): void {
    this.formArrayForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      minItems: [this.c.minItems || 0, [Validators.min(0)]],
      maxItems: [this.c.maxItems || null, [Validators.min(1)]]
    });
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.formArrayForm.valueChanges.subscribe(value => {
      if (!this.isUpdatingErrors) {
        this.updateComponentData(value);
      }
    });
  }

  private updateComponentData(formValue: any): void {
    this.c.name = formValue.name;
    this.c.displayLabel = formValue.displayLabel;
    this.c.minItems = formValue.minItems;
    this.c.maxItems = formValue.maxItems;

    this.updateErrors();
  }

  private updateErrors(): void {
    this.isUpdatingErrors = true;
    this.c.errors = [];

    // Check form-level errors
    if (this.formArrayForm.errors) {
      Object.keys(this.formArrayForm.errors).forEach(errorKey => {
        this.c.errors!.push({
          field: 'form',
          message: this.getErrorMessage(errorKey, this.formArrayForm.errors![errorKey]),
          type: 'custom'
        });
      });
    }

    // Check individual field errors
    Object.keys(this.formArrayForm.controls).forEach(controlName => {
      const control = this.formArrayForm.get(controlName);
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

    // Check min/max items validation
    this.validateItemsRange();

    this.isUpdatingErrors = false;
    this.cdr.detectChanges();
  }

  private validateItemsRange(): void {
    const minItems = this.formArrayForm.get('minItems')?.value;
    const maxItems = this.formArrayForm.get('maxItems')?.value;

    if (minItems !== null && maxItems !== null && minItems > maxItems) {
      this.c.errors!.push({
        field: 'itemsRange',
        message: 'Minimum items cannot be greater than maximum items',
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
    const field = this.formArrayForm.get(fieldName);
    return !!(field && field.invalid && field.dirty);
  }

  getFieldError(fieldName: string): string {
    const field = this.formArrayForm.get(fieldName);
    if (field && field.errors) {
      const errorKey = Object.keys(field.errors)[0];
      return this.getErrorMessage(errorKey, field.errors[errorKey]);
    }
    return '';
  }

  hasFormErrors(): boolean {
    return this.c.errors ? this.c.errors.length > 0 : false;
  }

  hasItemsRangeError(): boolean {
    const minItems = this.formArrayForm.get('minItems')?.value;
    const maxItems = this.formArrayForm.get('maxItems')?.value;
    return !!(minItems !== null && maxItems !== null && minItems > maxItems);
  }

  getItemsRangeError(): string {
    return 'Minimum items cannot be greater than maximum items';
  }

  toggleNameEdit(): void {
    this.showNameInput = true;
  }
}
