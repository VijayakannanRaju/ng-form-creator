import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, forwardRef, OnDestroy, HostListener } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Textbox } from '../form-components/textbox/textbox';
import { Heading } from '../form-components/heading/heading';
import { Description } from '../form-components/description/description';
import { FormComponentMetadata, TextboxMetadata, EmailboxMetadata, NumberboxMetadata, TextAreaMetadata, DropdownMetadata, RadioGroupMetadata, CheckboxSingleMetadata, CheckboxMultiMetadata, DateTimeMetadata, DateOnlyMetadata, TimeOnlyMetadata, FormArrayMetadata } from '../form.type';
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
    Textbox, Heading, Description, Emailbox, Numberbox, Dropdown, RadioGroup,
    CheckboxSingle, CheckboxMulti, Datetime, DateOnly, TimeOnly, Textarea,
    forwardRef(() => FormRenderer)
  ],
  templateUrl: './form-renderer.html',
  styleUrl: './form-renderer.scss',

})
export class FormRenderer implements OnChanges, OnInit, OnDestroy {
  @Input('components') metadata!: FormComponentMetadata[];
  @Input('formGroup') formGroup!: FormGroup;

  // Property to store max items error message
  maxItemsErrorMessage: string = '';

  constructor(private formBuilderService: FormBuilderService) {
    console.log('constructor called');
  }

  ngOnInit() {
    console.log(this.metadata);
    console.log('Form renderer - formGroup received:', this.formGroup);
  }

  ngOnDestroy(): void {
    // Clean up any subscriptions if needed
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  isFullWidthComponent(component: FormComponentMetadata): boolean {
    return (component as any).containerWidthInLargeScreen === 'full-width';
  }

  getComponentClasses(component: FormComponentMetadata): string {
    const smallWidth = (component as any).componentWidthInSmallScreen || 12;
    const mediumWidth = (component as any).componentWidthInMediumScreen || 12;
    const largeWidth = (component as any).componentWidthInLargeScreen || 12;
    
    return `col-${smallWidth} md:col-${mediumWidth} lg:col-${largeWidth}`;
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
    
    // Find the FormArrayMetadata to get maxItems
    const formArrayMetadata = this.findFormArrayMetadata(name);
    if (formArrayMetadata) {
      const maxItems = formArrayMetadata.maxItems;
      // Check if maxItems limit is reached
      if (maxItems && maxItems > 0 && array.length >= maxItems) {
        this.showMaxItemsError(formArrayMetadata.displayLabel, maxItems);
        return; // Don't add the item
      }
    }
    
    // Clear any previous error message
    this.maxItemsErrorMessage = '';
    
    // Add the new item
    const newGroup = this.formBuilderService.buildFormGroup(components);
    array.push(newGroup);
  }

  removeFormArrayItem(name: string, index: number) {
    const array = this.getFormArray(name);
    if (array.length > 1) { // Keep at least one item
      array.removeAt(index);
      
      // Clear error message when removing items
      this.maxItemsErrorMessage = '';
    }
  }

  private findFormArrayMetadata(name: string): FormArrayMetadata | null {
    // Extract the base name without the ID suffix
    const baseName = name.split('|||')[0];
    
    // Find the FormArrayMetadata in the metadata array
    for (const component of this.metadata) {
      if (component.type === 'FORM_ARRAY' && component.name === baseName) {
        return component as FormArrayMetadata;
      }
    }
    return null;
  }

  private showMaxItemsError(displayLabel: string, maxItems: number): void {
    this.maxItemsErrorMessage = `Maximum ${maxItems} items allowed for "${displayLabel}". Cannot add more items.`;
    
    // Auto-clear the message after 5 seconds
    setTimeout(() => {
      this.maxItemsErrorMessage = '';
    }, 5000);
  }
} 