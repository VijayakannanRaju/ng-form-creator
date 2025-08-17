// ========================
// form-types.ts
// ========================

// Common validation error type
export interface FormValidationError {
  field: string;
  message: string;
  type: 'required' | 'minlength' | 'maxlength' | 'pattern' | 'email' | 'min' | 'max' | 'custom';
}

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
  | FormArrayMetadata
  | TypeAheadWithHttpCallMetadata
  | TypeAheadWithHttpSearchMetadata;

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
  iconName: 'textbox.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'emailbox.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;
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
  iconName: 'numberbox.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'textarea.png';
  errors?: FormValidationError[];
  dragStarted?: boolean;
  showMetadataDiv: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'dropdown.png';
  errors?: FormValidationError[];
  dragStarted?: boolean;
  showMetadataDiv: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'radio-group.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'checkbox-single.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'checkbox-multi.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'datetime.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'dateonly.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'timeonly.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

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
  iconName: 'description.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;

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
  iconName: 'heading.png';
  showMetadataDiv: boolean;
  errors?: FormValidationError[];
  dragStarted?: boolean;

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
  iconName: 'form-group.png';
  errors?: FormValidationError[];
  showMetadataDiv: boolean;
  dragStarted?: boolean;
  showDropZone: boolean;

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
  iconName: 'form-array.png';
  errors?: FormValidationError[];
  showMetadataDiv: boolean;
  dragStarted?: boolean;
  showDropZone: boolean;


}


export interface TypeAheadWithHttpCallMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'TYPEAHEAD_WITH_HTTP_CALL';
  name: string;
  displayLabel: string;
  displayName: string;
  required?: boolean;
  selected?: boolean;
  placeholder?: string;
  arrayInResponsePath: string;
  optionDisplayLabelKeyInArray: string;
  optionValueKeyInArray: string;
  httpCallUrl: string;
  httpCallMethod: 'GET';
  iconName: 'typeahead-with-http-call.png';
  errors?: FormValidationError[];
  dragStarted?: boolean;
  showMetadataDiv: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

}


export interface TypeAheadWithHttpSearchMetadata {
  id?: string,
  dropZoneId?: string,
  type: 'TYPEAHEAD_WITH_HTTP_SEARCH';
  name: string;
  displayLabel: string;
  displayName: string;
  required?: boolean;
  selected?: boolean;
  placeholder?: string;
  arrayInResponsePath: string;
  optionDisplayLabelKeyInArray: string;
  optionValueKeyInArray: string;
  httpCallUrl: string;
  httpCallSearchQueryParam: string;
  httpCallMethod: 'GET';
  iconName: 'typeahead-with-http-search.png';
  errors?: FormValidationError[];
  dragStarted?: boolean;
  showMetadataDiv: boolean;
  containerWidthInLargeScreen: 'full-width' | 'inline';
  containerWidthInMediumScreen: 'full-width' | 'inline';
  containerWidthInSmallScreen: 'full-width' | 'inline';
  componentWidthInLargeScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInMediumScreen: 12 | 6 | 4 | 3 | 2 | 1;
  componentWidthInSmallScreen: 12 | 6 | 4 | 3 | 2 | 1;

}