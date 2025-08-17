import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GgNavBar } from "./gg-nav-bar/gg-nav-bar";
import { GgFormCreatorNavBarComponent } from './gg-form-creator-nav-bar/gg-form-creator-nav-bar.component';
import { GgInputSelectionComponent } from './gg-input-selection/gg-input-selection.component';
import { GgFormStructureComponent } from './gg-form-structure/gg-form-structure.component';
import { GgInputConfigurationComponent } from './gg-input-configuration/gg-input-configuration.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormMetadataService } from './form-metadata.service';
import { FormRenderer } from './form-renderer/form-renderer';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { buildValidators } from './utils/form-validators';
import { FormComponentMetadata } from './form.type';
import { FormBuilderService } from './utils/form-builder.service';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    GgNavBar,
    // GgFormCreatorNavBarComponent,
    GgInputSelectionComponent,
    GgFormStructureComponent,
    // GgInputConfigurationComponent,
    FormRenderer,
    JsonPipe,
    ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-form-creator';

  formStructure: any[] = [];
  showStructure = true;

  // Popup states
  showSuccessPopup = false;
  showErrorPopup = false;
  showPublishPopup = false;
  formData: any = {};
  validationErrors: Array<{ field: string, message: string }> = [];

  constructor(public formMetadataService: FormMetadataService,
    private formBuilderService: FormBuilderService
  ) {

  }




  currentComponent: any;
  onComponentClick(component: any) {
    console.log('Component clicked:', component);
    this.currentComponent = component;

    this.currentComponent.toggled = !this.currentComponent.toggled;
    // Here you can handle the component click event, e.g., open a configuration panel
    // or perform any other action based on the clicked component.
  }



  mainFormGroup!: FormGroup;
  toggleShowStructure() {

    if (this.showStructure) {
      this.mainFormGroup = this.formBuilderService.buildFormGroup(this.formMetadataService.components)

      // this.mainFormGroup = this.buildFormGroup(this.formMetadataService.components)
    }


    this.showStructure = !this.showStructure;

  }


  // private buildFormGroup(components: FormComponentMetadata[]): FormGroup {

  //   console.log(components);

  //   const group = new FormGroup({});

  //   for (const comp of components) {
  //     if (comp.type === 'TEXTBOX') {
  //       const validators = buildValidators({
  //         required: comp.required,
  //         minLength: comp.minLength,
  //         maxLength: comp.maxLength,
  //       });
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl('', validators));
  //     } else if (comp.type === 'EMAILBOX') {
  //       const validators = [Validators.email];
  //       if (comp.required) validators.push(Validators.required);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl('', validators));
  //     } else if (comp.type === 'NUMBERBOX') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
  //       if (comp.min != null) validators.push(Validators.min(comp.min));
  //       if (comp.max != null) validators.push(Validators.max(comp.max));
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl(null, validators));
  //     } else if (comp.type === 'TEXTAREA') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl('', validators));
  //     } else if (comp.type === 'DROPDOWN') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl('', validators));
  //     } else if (comp.type === 'RADIO_GROUP') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl('', validators));
  //     } else if (comp.type === 'CHECKBOX_SINGLE') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.requiredTrue);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl(false, validators));

  //     } else if (comp.type === 'CHECKBOX_MULTI') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required); // can add custom min-length validator if needed
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl([], validators));
  //     } else if (comp.type === 'DATETIME') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
  //       // Custom min/max validator can be added later
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl('', validators));
  //     } else if (comp.type === 'DATEONLY') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl(null, validators));
  //     } else if (comp.type === 'TIMEONLY') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl(null, validators));
  //     } else if (comp.type === 'FORM_GROUP') {
  //       const nestedGroup = this.buildFormGroup(comp.components);
  //       group.addControl(comp.name + '|||' + comp.id!, nestedGroup);
  //     } else if (comp.type === 'FORM_ARRAY') {
  //       // build one initial array item
  //       const arrayItemGroup = this.buildFormGroup(comp.components);
  //       const formArray = new FormArray<FormGroup>([arrayItemGroup]);
  //       group.addControl(comp.name + '|||' + comp.id!, formArray);
  //     }
  //   }

  //   return group;
  // }

  submit() {

    if (this.mainFormGroup.valid) {
      this.formData = this.mainFormGroup.value;
      this.showSuccessPopup = true;
      console.log('Form submitted successfully:', this.formData);
    } else {
      // Mark all form controls as touched to trigger validation highlighting
      this.markAllControlsAsTouched(this.mainFormGroup);
      this.collectValidationErrors();
      this.showErrorPopup = true;
      console.log('Form validation failed');
    }
  }

  private markAllControlsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      
      if (control instanceof FormGroup) {
        // Recursively mark nested form groups as touched
        this.markAllControlsAsTouched(control);
      } else if (control instanceof FormArray) {
        // Mark all controls in form arrays as touched
        control.controls.forEach((arrayControl, index) => {
          if (arrayControl instanceof FormGroup) {
            this.markAllControlsAsTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else if (control) {
        // Mark individual form controls as touched
        control.markAsTouched();
      }
    });
  }

  private collectValidationErrors() {
    this.validationErrors = [];
    this.collectErrorsFromGroup(this.mainFormGroup, '');
  }

  private collectErrorsFromGroup(formGroup: FormGroup, prefix: string) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      const fieldName = prefix ? `${prefix}.${key}` : key;

      if (control instanceof FormGroup) {
        this.collectErrorsFromGroup(control, fieldName);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) => {
          if (arrayControl instanceof FormGroup) {
            this.collectErrorsFromGroup(arrayControl, `${fieldName}[${index}]`);
          } else if (arrayControl.errors) {
            this.addValidationError(`${fieldName}[${index}]`, arrayControl.errors);
          }
        });
      } else if (control && control.errors) {
        this.addValidationError(fieldName, control.errors);
      }
    });
  }

  private addValidationError(fieldName: string, errors: any) {
    const fieldDisplayName = this.getFieldDisplayName(fieldName);

    if (errors['required']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: 'This field is required'
      });
    } else if (errors['email']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: 'Please enter a valid email address'
      });
    } else if (errors['minlength']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Minimum length is ${errors['minlength'].requiredLength} characters`
      });
    } else if (errors['maxlength']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Maximum length is ${errors['maxlength'].requiredLength} characters`
      });
    } else if (errors['min']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Minimum value is ${errors['min'].min}`
      });
    } else if (errors['max']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Maximum value is ${errors['max'].max}`
      });
    } else if (errors['invalidDate']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: 'Please enter a valid date'
      });
    } else if (errors['minDate']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Date must be on or after ${errors['minDate'].min}`
      });
    } else if (errors['maxDate']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Date must be on or before ${errors['maxDate'].max}`
      });
    } else if (errors['invalidTime']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: 'Please enter a valid time'
      });
    } else if (errors['minTime']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Time must be at or after ${errors['minTime'].min}`
      });
    } else if (errors['maxTime']) {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: `Time must be at or before ${errors['maxTime'].max}`
      });
    } else {
      this.validationErrors.push({
        field: fieldDisplayName,
        message: 'Invalid value'
      });
    }
  }

  private getFieldDisplayName(fieldName: string): string {
    // Remove the '|||id' suffix and convert to readable format
    const cleanName = fieldName.split('|||')[0];
    return cleanName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }



}
