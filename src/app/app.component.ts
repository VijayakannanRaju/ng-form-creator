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
import { FormComponentMetadata } from './form.type';
import { buildValidators } from './utils/form-validators';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
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

  constructor(public formMetadataService: FormMetadataService) {

  }




  currentComponent: any;
  onComponentClick(component: any) {
    console.log('Component clicked:', component);
    this.currentComponent = component;

    this.currentComponent.toggled = !this.currentComponent.toggled;
    // Here you can handle the component click event, e.g., open a configuration panel
    // or perform any other action based on the clicked component.
  }


  myForm!: FormGroup;

  toggleShowStructure() {
    // build the form group before toggling to preview mode
    if (this.showStructure) {
      this.myForm = this.buildFormGroup(this.formMetadataService.components);
    }

    this.showStructure = !this.showStructure;


  }


  buildFormGroup(components: FormComponentMetadata[]): FormGroup {
    const group = new FormGroup({});

    for (const comp of components) {
      if (comp.type === 'TEXTBOX') {
        // const validators = [];
        // if (comp.required) validators.push(Validators.required);
        // if (comp.minLength) validators.push(Validators.minLength(comp.minLength));
        // if (comp.maxLength) validators.push(Validators.maxLength(comp.maxLength));

        const validators = buildValidators({
          required: comp.required,
          minLength: comp.minLength,
          maxLength: comp.maxLength,
        });
        group.addControl(comp.name, new FormControl('', validators));
      } else if (comp.type === 'EMAILBOX') {
        const validators = [Validators.email];
        if (comp.required) validators.push(Validators.required);
        group.addControl(comp.name, new FormControl('', validators));
      } else if (comp.type === 'NUMBERBOX') {
        const validators = buildValidators({
          required: comp.required,
          minLength: comp.min,
          maxLength: comp.max,
        });
        group.addControl(comp.name, new FormControl(null, validators));
      } else if (comp.type === 'DROPDOWN') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(comp.name, new FormControl('', validators));
      } else if (comp.type === 'RADIO_GROUP') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(comp.name, new FormControl('', validators));
      } else if (comp.type === 'CHECKBOX_SINGLE') {
        const validators = [];
        if (comp.required) validators.push(Validators.requiredTrue);
        group.addControl(comp.name, new FormControl(false, validators));

      } else if (comp.type === 'CHECKBOX_MULTI') {
        const validators = [];
        if (comp.required) validators.push(Validators.required); // can add custom min-length validator if needed
        group.addControl(comp.name, new FormControl([], validators));
      } else if (comp.type === 'DATETIME') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);

        group.addControl(comp.name, new FormControl('', validators));
      } else if (comp.type === 'DATEONLY') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(comp.name, new FormControl(null, validators));
      } else if (comp.type === 'TIMEONLY') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(comp.name, new FormControl(null, validators));
      }

      else if (comp.type === 'FORM_GROUP') {
        const nestedGroup = this.buildFormGroup(comp.components);
        group.addControl(comp.name, nestedGroup);
      } else if (comp.type === 'FORM_ARRAY') {
        // build one initial array item
        const arrayItemGroup = this.buildFormGroup(comp.components);
        const formArray = new FormArray<FormGroup>([arrayItemGroup]);
        group.addControl(comp.name, formArray);
      }
    }

    return group;
  }


}
