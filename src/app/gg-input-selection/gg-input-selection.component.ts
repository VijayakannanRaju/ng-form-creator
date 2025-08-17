import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponentDragService } from '../input-component-drag.service';
import { FormComponentMetadata } from '../form.type';



@Component({
  selector: 'app-gg-input-selection',
  imports: [CommonModule],
  templateUrl: './gg-input-selection.component.html',
  styleUrl: './gg-input-selection.component.scss',
  standalone: true
})
export class GgInputSelectionComponent {

  inputList: FormComponentMetadata[] = [
    // {
    //   name: 'textbox',
    //   displayName: 'Text box',
    //   type: 'TEXT_BOX'
    // },
    {
      type: 'HEADING',
      name: 'heading',
      displayLabel: 'Heading',
      displayName: 'Heading',
      description: '',
      value: '',
      iconName: 'heading.png',
      showMetadataDiv: true
    },

    {
      type: 'DESCRIPTION',
      name: 'description',
      displayLabel: 'Description',
      displayName: 'Description',
      description: '',
      value: '',
      iconName: 'description.png',
      showMetadataDiv: true

    },

    {
      type: 'TEXTBOX',
      name: 'textbox',
      displayLabel: 'Text Box',
      displayName: 'Text Box',
      placeholder: 'placeholder text',
      maxLength: 1000,
      minLength: 1,
      required: false,
      iconName: 'textbox.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12

    },
    {
      type: 'EMAILBOX',
      name: 'emailbox',
      displayLabel: 'Email Box',
      displayName: 'Email Box',
      placeholder: 'placeholder text',
      required: false,
      iconName: 'emailbox.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12

    },

    {
      type: 'NUMBERBOX',
      name: 'numberbox',
      displayLabel: 'Number Box',
      displayName: 'Number Box',
      placeholder: 'placeholder text',
      required: false,
      min: 0,
      max: 1000,
      iconName: 'numberbox.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12

    },
    {
      type: 'TEXTAREA',
      name: 'textarea',
      displayLabel: 'Text Area Box',
      displayName: 'Text Area Box',
      placeholder: 'placeholder text',
      maxLength: 1000,
      minLength: 1,
      required: false,
      rows: 4,
      iconName: 'textarea.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },

    {
      type: 'DROPDOWN',
      name: 'dropdown',
      displayLabel: 'Dropdown',
      displayName: 'Dropdown',
      required: false,
      options: [
        { value: 'option1', display: 'Option 1' },
        { value: 'option2', display: 'Option 2' },
        { value: 'option3', display: 'Option 3' }
      ],
      iconName: 'dropdown.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },

    {
      type: 'RADIO_GROUP',
      name: 'radiogroup',
      displayLabel: 'Radio Group',
      displayName: 'Radio Group',
      required: false,
      options: [
        { value: 'option1', display: 'Option 1' },
        { value: 'option2', display: 'Option 2' },
        { value: 'option3', display: 'Option 3' }
      ],
      iconName: 'radio-group.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },

    {
      type: 'CHECKBOX_SINGLE',
      name: 'checkboxsingle',
      displayLabel: 'Checkbox single',
      displayName: 'Checkbox single',
      required: false,
      options: [
        { value: 'option1', display: 'Option 1' }
      ],
      iconName: 'checkbox-single.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },


    {
      type: 'CHECKBOX_MULTI',
      name: 'checkboxmulti',
      displayLabel: 'Checkbox multi',
      displayName: 'Checkbox multi',
      required: false,
      options: [
        { value: 'option1', display: 'Option 1' },
        { value: 'option2', display: 'Option 2' },
        { value: 'option3', display: 'Option 3' }
      ],
      iconName: 'checkbox-multi.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },

    {
      type: 'DATETIME',
      name: 'datetime',
      displayLabel: 'Date Time',
      displayName: 'Date Time',
      placeholder: 'placeholder text',
      minDate: undefined,
      maxDate: undefined,
      required: false,
      iconName: 'datetime.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },

    {
      type: 'DATEONLY',
      name: 'dateonly',
      displayLabel: 'Date',
      displayName: 'Date',
      placeholder: 'placeholder text',
      minDate: undefined,
      maxDate: undefined,
      required: false,
      iconName: 'dateonly.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },

    {
      type: 'TIMEONLY',
      name: 'timeonly',
      displayLabel: 'Time',
      displayName: 'Time',
      placeholder: 'placeholder text',
      minTime: undefined,
      maxTime: undefined,
      required: false,
      iconName: 'timeonly.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },



    {
      type: 'FORM_GROUP',
      name: 'formgroup',
      displayName: 'Form Group',
      displayLabel: 'Form Group',
      components: [],
      iconName: 'form-group.png',
      showMetadataDiv: true,
      showDropZone: true
    },

    {
      type: 'FORM_ARRAY',
      name: 'formarray',
      displayName: 'Form Array',
      displayLabel: 'Form Array',
      components: [],
      minItems: undefined,
      maxItems: undefined,
      iconName: 'form-array.png',
      showMetadataDiv: true,
      showDropZone: true

    },

    {

      type: 'TYPEAHEAD_WITH_HTTP_CALL',
      name: 'typeaheadwithhttpcall',
      displayLabel: 'Typeahead with http call',
      displayName: 'Typeahead with http call',
      arrayInResponsePath: 'results',
      optionDisplayLabelKeyInArray: 'name',
      optionValueKeyInArray: 'url',
      httpCallUrl: 'https://pokeapi.co/api/v2/pokemon?limit=2000',
      httpCallMethod: 'GET',
      iconName: 'typeahead-with-http-call.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    },

    {

      type: 'TYPEAHEAD_WITH_HTTP_SEARCH',
      name: 'typeaheadwithhttpsearch',
      displayLabel: 'Typeahead with http search',
      displayName: 'Typeahead with http search',
      arrayInResponsePath: 'results',
      optionDisplayLabelKeyInArray: 'name',
      optionValueKeyInArray: 'url',
      httpCallUrl: 'https://pokeapi.co/api/v2/pokemon?limit=3',
      httpCallSearchQueryParam: 'search',
      httpCallMethod: 'GET',
      iconName: 'typeahead-with-http-search.png',
      showMetadataDiv: true,
      containerWidthInLargeScreen: 'full-width',
      containerWidthInMediumScreen: 'full-width',
      containerWidthInSmallScreen: 'full-width',
      componentWidthInLargeScreen: 12,
      componentWidthInMediumScreen: 12,
      componentWidthInSmallScreen: 12
    }


  ];

  constructor(private inputComponentDragService: InputComponentDragService) { }

  onDragStart(event: DragEvent, item: FormComponentMetadata) {
    this.inputComponentDragService.setData(item);
    this.inputComponentDragService.showOverlay = true;

    console.log(item);
    item.id = this.generateUniqueId(); // Assign a unique ID to the item
    // item.idOfBeforeDiv = item.id + '-before'; // ID for the before div
    // item.idOfAfterDiv = item.id + '-after'; // ID for the after div

    if (['FORM_GROUP', 'FORM_ARRAY'].includes(item.type)) {
      item.dropZoneId = this.generateUniqueId();
    }
    // Assign a unique drop zone ID for groups and arrays


    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Optional
  }

  onDragEnd(event: DragEvent) {
    this.inputComponentDragService.showOverlay = false;
  }


  generateUniqueId(): string {
    return 'id' + Date.now() + Math.floor(Math.random() * 10000);
  }

}
