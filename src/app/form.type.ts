// ========================
// form-types.ts
// ========================

export type FormComponentMetadata =
  | TextboxMetadata
  | EmailboxMetadata
  | NumberboxMetadata
  | TextAreaMetadata
  | DropdownMetadata
  | RadioGroupMetadata
  | CheckboxSingleMetadata
  | CheckboxMultiMetadata
  | DateTimeMetadata
  | DateOnlyMetadata
  | TimeOnlyMetadata
  | DescriptionMetadata
  | HeadingMetadata
  | FormGroupMetadata
  | FormArrayMetadata;

export interface TextboxMetadata {
  id?: string,
  dropZoneId?: undefined,
  type: 'TEXTBOX';
  name: string;
  displayLabel: string;
  displayName: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  selected?: boolean;
  iconName: 'textbox.png'
}

export interface EmailboxMetadata {
  id?: string,
  dropZoneId?: undefined,
  type: 'EMAILBOX';
  name: string;
  displayLabel: string;
  displayName: string;
  placeholder?: string;
  required?: boolean;
  selected?: boolean;
  iconName: 'emailbox.png'


}

export interface NumberboxMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'NUMBERBOX';
  name: string;
  displayLabel: string;
  displayName: string;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  selected?: boolean;
  iconName: 'numberbox.png'


}

export interface TextAreaMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'TEXTAREA';
  name: string;
  displayLabel: string;
  displayName: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  selected?: boolean;
  rows?: number;
  iconName: 'textarea.png'


}

export interface DropdownMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'DROPDOWN';
  name: string;
  displayLabel: string;
  displayName: string;
  required?: boolean;
  selected?: boolean;

  options: { value: any; display: string }[];
  iconName: 'dropdown.png'

}

export interface RadioGroupMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'RADIO_GROUP';
  name: string;
  displayLabel: string;
  displayName: string;
  required?: boolean;
  selected?: boolean;

  options: { value: any; display: string }[];
  iconName: 'radio-group.png'

}

export interface CheckboxSingleMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'CHECKBOX_SINGLE';
  name: string;
  displayLabel: string;
  displayName: string;
  required?: boolean;
  selected?: boolean;

  options: { value: any; display: string }[]; // should have only one item ideally
  iconName: 'checkbox-single.png'

}

export interface CheckboxMultiMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'CHECKBOX_MULTI';
  name: string;
  displayLabel: string;
  displayName: string;
  required?: boolean;
  selected?: boolean;

  options: { value: any; display: string }[];
  iconName: 'checkbox-multi.png'

}

export interface DateTimeMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'DATETIME';
  name: string;
  displayLabel: string;
  displayName: string;
  placeholder?: string;
  required?: boolean;
  minDate?: string; // ISO format
  maxDate?: string;
  selected?: boolean;
  iconName: 'datetime.png'


}

export interface DateOnlyMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'DATEONLY';
  name: string;
  displayLabel: string;
  displayName: string;
  placeholder?: string;
  required?: boolean;
  minDate?: string; // ISO format preferred
  maxDate?: string;
  selected?: boolean;
  iconName: 'dateonly.png'


}

export interface TimeOnlyMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'TIMEONLY';
  name: string;
  displayLabel: string;
  displayName: string;
  placeholder?: string;
  required?: boolean;
  minTime?: string; // "HH:mm"
  maxTime?: string;
  selected?: boolean;
  iconName: 'timeonly.png'


}



export interface DescriptionMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'DESCRIPTION';
  name: string;
  displayLabel: string;
  displayName: string;
  value: string;
  description: string;
  selected?: boolean;
  iconName: 'description.png'


}

export interface HeadingMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'HEADING';
  name: string;
  displayLabel: string;
  displayName: string;
  value: string;
  description: string;
  selected?: boolean;
  iconName: 'heading.png'



}

export interface FormGroupMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'FORM_GROUP';
  name: string;
  displayName: string;
  displayLabel: string;
  components: FormComponentMetadata[];
  selected?: boolean;
  iconName: 'form-group.png'


}

export interface FormArrayMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'FORM_ARRAY';
  name: string;
  displayName: string;
  displayLabel: string;
  components: FormComponentMetadata[]; // These are the children that each FormGroup in the array should have
  label?: string;
  minItems?: number;
  maxItems?: number;
  required?: boolean;
  selected?: boolean;
  iconName: 'form-array.png'


}