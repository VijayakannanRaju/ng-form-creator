import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponentMetadata } from '../form.type';
import { buildValidators } from './form-validators';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor() { }

  /**
   * Builds a FormGroup from an array of form component metadata
   * This is the centralized form building logic used by both app component and form renderer
   */
  buildFormGroup(components: FormComponentMetadata[]): FormGroup {
    console.log('FormBuilderService: Building form group for components:', components);

    const group = new FormGroup({});

    for (const comp of components) {
      const controlName = comp.name + '|||' + comp.id!;
      console.log('FormBuilderService: Processing component:', comp.type, 'with control name:', controlName);

      if (comp.type === 'TEXTBOX') {
        const validators = buildValidators({
          required: comp.required,
          minLength: comp.minLength,
          maxLength: comp.maxLength,
        });
        group.addControl(controlName, new FormControl('', validators));
        console.log('FormBuilderService: Added TEXTBOX control:', controlName);
      } else if (comp.type === 'EMAILBOX') {
        const validators = [Validators.email];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl('', validators));
        console.log('FormBuilderService: Added EMAILBOX control:', controlName);
      } else if (comp.type === 'NUMBERBOX') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        if (comp.min != null) validators.push(Validators.min(comp.min));
        if (comp.max != null) validators.push(Validators.max(comp.max));
        group.addControl(controlName, new FormControl(null, validators));
        console.log('FormBuilderService: Added NUMBERBOX control:', controlName);
      } else if (comp.type === 'TEXTAREA') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl('', validators));
        console.log('FormBuilderService: Added TEXTAREA control:', controlName);
      } else if (comp.type === 'DROPDOWN') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl('', validators));
        console.log('FormBuilderService: Added DROPDOWN control:', controlName);
      } else if (comp.type === 'RADIO_GROUP') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl('', validators));
        console.log('FormBuilderService: Added RADIO_GROUP control:', controlName);
      } else if (comp.type === 'CHECKBOX_SINGLE') {
        const validators = [];
        if (comp.required) validators.push(Validators.requiredTrue);
        group.addControl(controlName, new FormControl(false, validators));
        console.log('FormBuilderService: Added CHECKBOX_SINGLE control:', controlName);
      } else if (comp.type === 'CHECKBOX_MULTI') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl([], validators));
        console.log('FormBuilderService: Added CHECKBOX_MULTI control:', controlName);
      } else if (comp.type === 'DATETIME') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl('', validators));
        console.log('FormBuilderService: Added DATETIME control:', controlName);
      } else if (comp.type === 'DATEONLY') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl(null, validators));
        console.log('FormBuilderService: Added DATEONLY control:', controlName);
      } else if (comp.type === 'TIMEONLY') {
        const validators = [];
        if (comp.required) validators.push(Validators.required);
        group.addControl(controlName, new FormControl(null, validators));
        console.log('FormBuilderService: Added TIMEONLY control:', controlName);
      } else if (comp.type === 'FORM_GROUP') {
        const nestedGroup = this.buildFormGroup(comp.components);
        group.addControl(controlName, nestedGroup);
        console.log('FormBuilderService: Added FORM_GROUP control:', controlName);
      } else if (comp.type === 'FORM_ARRAY') {
        // Build one initial array item
        const arrayItemGroup = this.buildFormGroup(comp.components);
        const formArray = new FormArray<FormGroup>([arrayItemGroup]);
        group.addControl(controlName, formArray);
        console.log('FormBuilderService: Added FORM_ARRAY control:', controlName);
      }
    }

    console.log('FormBuilderService: Form group controls:', Object.keys(group.controls));
    return group;
  }
} 