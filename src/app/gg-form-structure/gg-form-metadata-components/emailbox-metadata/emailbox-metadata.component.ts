import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EmailboxMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValidationError } from '../../../form.type';

@Component({
  selector: 'app-emailbox-metadata',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './emailbox-metadata.component.html',
  styleUrl: './emailbox-metadata.component.scss',
  standalone: true
})
export class EmailboxMetadataComponent implements OnInit, OnDestroy {
  @Input('component') c!: EmailboxMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false

  emailboxForm!: FormGroup;
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
    this.emailboxForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      placeholder: [this.c.placeholder || ''],
      required: [this.c.required || false]
    });
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.emailboxForm.valueChanges.subscribe(formValues => {
      // Update the component object in real-time
      this.c.name = formValues.name;
      this.c.displayLabel = formValues.displayLabel;
      this.c.placeholder = formValues.placeholder;
      this.c.required = formValues.required;

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
    const displayLabelControl = this.emailboxForm.get('displayLabel');
    const displayLabel = displayLabelControl?.value;
    if (!displayLabel || displayLabel.trim() === '') {
      errors.push({
        field: 'displayLabel',
        message: 'Display label is required',
        type: 'required'
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
    const nameValue = this.emailboxForm.get('name')?.value;
    if (!nameValue || nameValue.trim() === '') {
      // If name is empty, set it to displayName
      this.emailboxForm.patchValue({ name: this.c.displayName });
    }
    this.showNameInput = false;
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.emailboxForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  isFieldRequired(fieldName: string): boolean {
    const field = this.emailboxForm.get(fieldName);
    return field ? field.hasError('required') : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.emailboxForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  // Check if form has errors regardless of interaction state (for exclamation icon)
  hasFormErrors(): boolean {
    return this.emailboxForm.invalid;
  }
}

