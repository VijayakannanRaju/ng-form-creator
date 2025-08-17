import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { TypeAheadWithHttpSearchMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValidationError } from '../../../form.type';

@Component({
  selector: 'app-typeahead-with-http-search-metadata',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './typeahead-with-http-search-metadata.component.html',
  styleUrl: './typeahead-with-http-search-metadata.component.scss',
  standalone: true
})
export class TypeaheadWithHttpSearchMetadataComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input('component') c!: TypeAheadWithHttpSearchMetadata;
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
      httpCallSearchQueryParam: [this.c.httpCallSearchQueryParam || '', [Validators.required]],
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
      this.c.httpCallSearchQueryParam = formValues.httpCallSearchQueryParam;
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

    // Check form validation errors
    Object.keys(this.typeaheadForm.controls).forEach(key => {
      const control = this.typeaheadForm.get(key);
      if (control && control.errors) {
        Object.keys(control.errors).forEach(errorKey => {
          const errorMessage = this.getErrorMessage(key, errorKey, control.errors![errorKey]);
          if (errorMessage) {
            errors.push({
              field: key,
              message: errorMessage,
              type: this.getErrorType(errorKey)
            });
          }
        });
      }
    });

    // Update the component's errors array
    this.c.errors = errors;
    this.isUpdatingErrors = false;
  }

  private getErrorMessage(fieldName: string, errorKey: string, errorValue: any): string {
    const fieldDisplayNames: { [key: string]: string } = {
      'displayLabel': 'Display Label',
      'arrayInResponsePath': 'Array in Response Path',
      'optionDisplayLabelKeyInArray': 'Option Display Label Key',
      'optionValueKeyInArray': 'Option Value Key',
      'httpCallUrl': 'HTTP Call URL',
      'httpCallSearchQueryParam': 'Search Query Parameter'
    };

    const displayName = fieldDisplayNames[fieldName] || fieldName;

    switch (errorKey) {
      case 'required':
        return `${displayName} is required`;
      case 'pattern':
        return `${displayName} must be a valid URL`;
      default:
        return `${displayName} is invalid`;
    }
  }

  private getErrorType(errorKey: string): FormValidationError['type'] {
    switch (errorKey) {
      case 'required':
        return 'required';
      case 'pattern':
        return 'pattern';
      default:
        return 'custom';
    }
  }

  ngAfterViewChecked(): void {
    // This lifecycle hook is used to handle the ExpressionChangedAfterItHasBeenCheckedError
    // It's called after every change detection cycle
  }

  onDragStart(event: DragEvent) {
    this.inputComponentDragService.setData(this.c);
    this.inputComponentDragService.showOverlay = true;
    event.dataTransfer?.setData('text/plain', JSON.stringify(this.c));
  }

  onDragEnd(event: DragEvent) {
    this.inputComponentDragService.showOverlay = false;
  }

  toggleNameInput() {
    this.showNameInput = !this.showNameInput;
    if (this.showNameInput) {
      setTimeout(() => {
        this.nameInputRef?.nativeElement.focus();
      }, 0);
    }
  }

  onNameBlur() {
    this.showNameInput = false;
  }

  getFieldError(fieldName: string): string | null {
    const control = this.typeaheadForm.get(fieldName);
    if (control && control.errors && control.touched) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return this.getErrorMessage(fieldName, firstErrorKey, control.errors[firstErrorKey]);
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.typeaheadForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }
}
