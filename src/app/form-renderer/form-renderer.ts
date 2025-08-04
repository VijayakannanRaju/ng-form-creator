import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Textbox } from '../form-components/textbox/textbox';
import { Heading } from '../form-components/heading/heading';
import { Description } from '../form-components/description/description';
import { FormComponentMetadata } from '../form.type';
import { buildValidators } from '../utils/form-validators';
import { Emailbox } from '../form-components/emailbox/emailbox';
import { Numberbox } from '../form-components/numberbox/numberbox';
import { Dropdown } from '../form-components/dropdown/dropdown';
import { RadioGroup } from '../form-components/radio-group/radio-group';
import { CheckboxSingle } from '../form-components/checkbox-single/checkbox-single';
import { CheckboxMulti } from '../form-components/checkbox-multi/checkbox-multi';
import { Datetime } from '../form-components/datetime/datetime';
import { DateOnly } from '../form-components/date-only/date-only';
import { TimeOnly } from '../form-components/time-only/time-only';
import { Textarea } from '../form-components/textarea/textarea.component';
import { buildFormGroup } from '../utils/form-builder';
import { FormBuilderService } from '../utils/form-builder.service';



@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    Textbox, Heading, Description, FormRenderer, Emailbox, Numberbox, Dropdown, RadioGroup,
    CheckboxSingle, CheckboxMulti, Datetime, DateOnly, TimeOnly, Textarea
  ],
  templateUrl: './form-renderer.html'
})
export class FormRenderer implements OnChanges, OnInit {
  @Input('components') metadata!: FormComponentMetadata[];
  @Input('formGroup') formGroup!: FormGroup;

  constructor(private formBuilderService: FormBuilderService) {
    console.log('constructor called');
  }

  ngOnInit() {
    console.log(this.metadata);
    console.log('Form renderer - formGroup received:', this.formGroup);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  getFormGroup(name: string): FormGroup {
    const group = this.formGroup.get(name);
    if (!group || !(group instanceof FormGroup)) {
      throw new Error(`Expected FormGroup for control '${name}', but got: ${group}`);
    }
    return group;
  }

  getFormGroupFromArray(arrayName: string, index: number): FormGroup {
    const control = this.getFormArray(arrayName).at(index);
    if (!(control instanceof FormGroup)) {
      throw new Error(`Expected FormGroup at index ${index} in array '${arrayName}'`);
    }
    return control;
  }

  getFormArray(name: string): FormArray {
    const control = this.formGroup.get(name);
    if (!(control instanceof FormArray)) {
      throw new Error(`Expected FormArray for '${name}', got: ${control}`);
    }
    return control;
  }

  addFormArrayItem(name: string, components: FormComponentMetadata[]) {
    const array = this.getFormArray(name);
    // const newGroup = this.buildFormGroup(components);
    const newGroup = this.formBuilderService.buildFormGroup(components);

    array.push(newGroup);
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
  //       if (comp.required) validators.push(Validators.required);
  //       group.addControl(comp.name + '|||' + comp.id!, new FormControl([], validators));
  //     } else if (comp.type === 'DATETIME') {
  //       const validators = [];
  //       if (comp.required) validators.push(Validators.required);
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
  //       const arrayItemGroup = this.buildFormGroup(comp.components);
  //       const formArray = new FormArray<FormGroup>([arrayItemGroup]);
  //       group.addControl(comp.name + '|||' + comp.id!, formArray);
  //     }
  //   }

  //   return group;
  // }


}