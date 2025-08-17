import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { TypeAheadWithHttpCallMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValidationError } from '../../../form.type';

@Component({
  selector: 'app-typeahead-with-http-call-metadata',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './typeahead-with-http-call-metadata.component.html',
  styleUrl: './typeahead-with-http-call-metadata.component.scss',
  standalone: true
})
export class TypeaheadWithHttpCallMetadataComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input('component') c!: TypeAheadWithHttpCallMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false

  typeaheadForm!: FormGroup;
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
    this.typeaheadForm = this.fb.group({
      name: [this.c.name || ''],
      displayLabel: [this.c.displayLabel || '', [Validators.required]],
      required: [this.c.required || false],
      arrayInResponsePath: [this.c.arrayInResponsePath || '', [Validators.required]],
      optionDisplayLabelKeyInArray: [this.c.optionDisplayLabelKeyInArray || '', [Validators.required]],
      optionValueKeyInArray: [this.c.optionValueKeyInArray || '', [Validators.required]],
      httpCallUrl: [this.c.httpCallUrl || '', [Validators.required, Validators.pattern('https?://.+')]],
      httpCallMethod: [this.c.httpCallMethod || 'GET'],
      // Responsive width controls
      containerWidthInLargeScreen: [this.c.containerWidthInLargeScreen || 'full-width'],
      containerWidthInMediumScreen: [this.c.containerWidthInMediumScreen || 'full-width'],
      containerWidthInSmallScreen: [this.c.containerWidthInSmallScreen || 'full-width'],
      componentWidthInLargeScreen: [this.c.componentWidthInLargeScreen || 12],
      componentWidthInMediumScreen: [this.c.componentWidthInMediumScreen || 12],
      componentWidthInSmallScreen: [this.c.componentWidthInSmallScreen || 12]
    });
  }

  private setupFormSubscription(): void {
    this.formSubscription = this.typeaheadForm.valueChanges.subscribe(formValues => {
      // Update the component object in real-time
      this.c.name = formValues.name;
      this.c.displayLabel = formValues.displayLabel;
      this.c.required = formValues.required;
      this.c.arrayInResponsePath = formValues.arrayInResponsePath;
      this.c.optionDisplayLabelKeyInArray = formValues.optionDisplayLabelKeyInArray;
      this.c.optionValueKeyInArray = formValues.optionValueKeyInArray;
      this.c.httpCallUrl = formValues.httpCallUrl;
      this.c.httpCallMethod = formValues.httpCallMethod;
      
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
    if (this.isUpdatingErrors) return;
    this.isUpdatingErrors = true;

    const errors: FormValidationError[] = [];
    const form = this.typeaheadForm;

    // Check displayLabel
    if (form.get('displayLabel')?.invalid && form.get('displayLabel')?.dirty) {
      const control = form.get('displayLabel');
      if (control?.errors?.['required']) {
        errors.push({ field: 'displayLabel', message: 'Display Label is required', type: 'required' });
      }
    }

    // Check arrayInResponsePath
    if (form.get('arrayInResponsePath')?.invalid && form.get('arrayInResponsePath')?.dirty) {
      const control = form.get('arrayInResponsePath');
      if (control?.errors?.['required']) {
        errors.push({ field: 'arrayInResponsePath', message: 'Array in Response Path is required', type: 'required' });
      }
    }

    // Check optionDisplayLabelKeyInArray
    if (form.get('optionDisplayLabelKeyInArray')?.invalid && form.get('optionDisplayLabelKeyInArray')?.dirty) {
      const control = form.get('optionDisplayLabelKeyInArray');
      if (control?.errors?.['required']) {
        errors.push({ field: 'optionDisplayLabelKeyInArray', message: 'Option Display Label Key is required', type: 'required' });
      }
    }

    // Check optionValueKeyInArray
    if (form.get('optionValueKeyInArray')?.invalid && form.get('optionValueKeyInArray')?.dirty) {
      const control = form.get('optionValueKeyInArray');
      if (control?.errors?.['required']) {
        errors.push({ field: 'optionValueKeyInArray', message: 'Option Value Key is required', type: 'required' });
      }
    }

    // Check httpCallUrl
    if (form.get('httpCallUrl')?.invalid && form.get('httpCallUrl')?.dirty) {
      const control = form.get('httpCallUrl');
      if (control?.errors?.['required']) {
        errors.push({ field: 'httpCallUrl', message: 'HTTP Call URL is required', type: 'required' });
      } else if (control?.errors?.['pattern']) {
        errors.push({ field: 'httpCallUrl', message: 'Please enter a valid URL starting with http:// or https://', type: 'pattern' });
      }
    }

    // Update the component's errors array
    this.c.errors = errors.length > 0 ? errors : undefined;

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
    this.showNameInput = false;
    // Update the component name if it's different
    if (this.c.name !== this.typeaheadForm.get('name')?.value) {
      this.c.name = this.typeaheadForm.get('name')?.value || this.c.name;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.typeaheadForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  isFieldRequired(fieldName: string): boolean {
    const field = this.typeaheadForm.get(fieldName);
    return field ? field.hasValidator(Validators.required) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.typeaheadForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    if (errors['required']) return 'This field is required';
    if (errors['pattern']) return 'Please enter a valid format';
    if (errors['min']) return `Minimum value is ${errors['min'].min}`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}`;

    return 'Invalid input';
  }

  hasFormErrors(): boolean {
    return this.c.errors !== undefined && this.c.errors !== null && this.c.errors.length > 0;
  }
}
