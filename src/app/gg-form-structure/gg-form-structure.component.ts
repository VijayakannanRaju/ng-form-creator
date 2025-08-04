import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { InputComponentDragService } from '../input-component-drag.service';
import { SelectedFormElementService } from '../selected-form-element.service';
import { FormMetadataService } from '../form-metadata.service';
import { Form } from '@angular/forms';
import { HighlightDirective } from '../drag-highlight.directive';
import { BorderTopDirective } from '../border-top.directive';
import { FormComponentMetadata } from '../form.type';
import { HeadingMetadataComponent } from "./gg-form-metadata-components/heading-metadata/heading-metadata.component";
import { FormGroupMetadataComponent } from "./gg-form-metadata-components/form-group-metadata/form-group-metadata.component";
import { DescriptionMetadataComponent } from "./gg-form-metadata-components/description-metadata/description-metadata.component";
import { DateOnlyMetadataComponent } from './gg-form-metadata-components/date-only-metadata/date-only-metadata.component';
import { CheckboxMultiMetadataComponent } from './gg-form-metadata-components/checkbox-multi-metadata/checkbox-multi-metadata.component';
import { RadioGroupMetadataComponent } from './gg-form-metadata-components/radio-group-metadata/radio-group-metadata.component';
import { TextareaMetadataComponent } from './gg-form-metadata-components/textarea-metadata/textarea-metadata.component';
import { TimeOnlyMetadataComponent } from './gg-form-metadata-components/time-only-metadata/time-only-metadata.component';
import { DateTimeMetadataComponent } from './gg-form-metadata-components/date-time-metadata/date-time-metadata.component';
import { CheckboxSingleMetadataComponent } from './gg-form-metadata-components/checkbox-single-metadata/checkbox-single-metadata.component';
import { DropdownMetadataComponent } from "./gg-form-metadata-components/dropdown-metadata/dropdown-metadata.component";
import { TextboxMetadataComponent } from './gg-form-metadata-components/textbox-metadata/textbox-metadata.component';
import { EmailboxMetadataComponent } from './gg-form-metadata-components/emailbox-metadata/emailbox-metadata.component';
import { FormArrayMetadataComponent } from './gg-form-metadata-components/form-array-metadata/form-array-metadata.component';
import { NumberboxMetadataComponent } from './gg-form-metadata-components/numberbox-metadata/numberbox-metadata.component';
// Shared Interface for form component metadata
export interface FormComponent {
  type: string;
  metadata: any;
  children?: FormComponent[];
}

@Component({
  selector: 'app-gg-form-structure',
  imports: [CommonModule, HighlightDirective, BorderTopDirective,
    HeadingMetadataComponent,
    FormGroupMetadataComponent,
    DescriptionMetadataComponent,
    DateOnlyMetadataComponent,
    RadioGroupMetadataComponent,
    TextareaMetadataComponent,
    TimeOnlyMetadataComponent,
    DateTimeMetadataComponent,
    CheckboxSingleMetadataComponent,
    CheckboxMultiMetadataComponent,
    DropdownMetadataComponent,
    TextboxMetadataComponent,
    TextareaMetadataComponent,
    EmailboxMetadataComponent,
    NumberboxMetadataComponent,
    FormArrayMetadataComponent
  ],
  templateUrl: './gg-form-structure.component.html',
  styleUrl: './gg-form-structure.component.scss',
  standalone: true
})
export class GgFormStructureComponent {
  @Input() components: FormComponentMetadata[] = [];
  @Output() structureChanged = new EventEmitter<any[]>();
  @Input() dropZoneId: string = 'root';



  constructor(private inputComponentDragService: InputComponentDragService,
    private selectedFormElementService: SelectedFormElementService,
    private formMetadataService: FormMetadataService,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }
  onDragOver(event: DragEvent, c?: any) {
    event.preventDefault(); // Necessary to allow dropping

  }


  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const data = this.inputComponentDragService.getData();
    //console.log("Dropped Data", data);

    let item;

    if (data && (data.type == 'FORM_GROUP' || data.type == 'FORM_ARRAY')) {
      item = {
        ...data,
        components: data.components ?
          JSON.parse(JSON.stringify(data.components)) :
          (['FORM_GROUP', 'FORM_ARRAY'].includes(data.type) ? [] : undefined)
      };
    } else {
      item = { ...data }
    }

    // console.log("Parsed Item", item);



    // console.log('Drop event:', event);


    const droppedElement = event.target as HTMLElement;
    // console.log('Dropped On Element ID', droppedElement.id);


    if (droppedElement.classList.contains('drop-zone') || droppedElement.id.includes(this.dropZoneId)) {
      // console.log('Dropped on zone:', droppedElement.id);
      // console.log(this.components);

      // console.log(item);

      this.components.push(JSON.parse(JSON.stringify(item)));
      // console.log(this.components);

    }




    if (
      droppedElement.id.includes('-label') ||
      droppedElement.id.includes('-component') ||
      droppedElement.id.includes('-topHighlight') ||
      droppedElement.id.includes('-componentCard') ||
      droppedElement.id.includes('-overlay')) {
      let id = '';
      if (droppedElement.id.includes('-label')) {
        id = droppedElement.id.split('-label')[0];
      } else if (droppedElement.id.includes('-component')) {
        id = droppedElement.id.split('-component')[0];
      } else if (droppedElement.id.includes('-topHighlight')) {
        id = droppedElement.id.split('-topHighlight')[0];
      } else if (droppedElement.id.includes('-componentCard')) {
        id = droppedElement.id.split('-componentCard')[0];
      } else if (droppedElement.id.includes('-overlay')) {
        id = droppedElement.id.split('-overlay')[0];
      }
      // console.log('Dropped on LABEL:', droppedElement.id);
      // this.components.push(item);
      this.dropOnBeforeDiv(this.components, id, item)

    }


    // if (droppedElement.classList.contains('before-drop-item')) {
    //   // console.log('Dropped on before :', droppedElement.id);
    //   this.dropOnBeforeDiv(this.components, droppedElement.id.split('-before')[0], item)
    // }


    // if (droppedElement.classList.contains('after-drop-item')) {
    //   // console.log('Dropped on  after:', droppedElement.id);
    //   this.dropOnAfterDiv(this.components, droppedElement.id.split('-after')[0], item)
    // }








    // 🚀 Emit updated structure to parent
    // this.structureChanged.emit(this.components);

    this.inputComponentDragService.showOverlay = false; // Hide overlay after drop
  }


  onDragEnd(event: DragEvent) {
    this.inputComponentDragService.showOverlay = false;
  }



  componentSelected(event: Event, c: any) {
    event.stopPropagation();
    // console.log('Component selected:', c);
    this.deselectOtherComponents(this.formMetadataService.components);
    c.selected = true;
    this.selectedFormElementService.selectedElement = c;

  }

  deselectOtherComponents(components: FormComponentMetadata[]) {
    components.forEach(c => {
      c.selected = false;
      if ('components' in c && Array.isArray(c.components)) {
        this.deselectOtherComponents(c.components)
      }
    });
  }


  onDragStart(event: DragEvent, item: any) {
    event.stopPropagation();
    this.inputComponentDragService.setData(item);
    // console.log(item);
    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Optional
    this.inputComponentDragService.showOverlay = true; // Show overlay on drag start

    this.removeComponent(item.id, this.formMetadataService.components); // Remove the component from the list

  }

  removeComponent(id: any, components: any) {

    // console.log('Removing Component with ID:', id);

    components.forEach((c: any, index: number) => {
      if (c.id == id) {
        // console.log('Component found at index:', index);
        components.splice(index, 1); // Remove the component from the array
      } else if (c.components) {
        this.removeComponent(id, c.components); // Recursively search in children
      }

    });
  }


  dropOnBeforeDiv(components: any, relativeComponentId: string, item: any) {

    // console.log(this.components);
    // console.log(relativeComponentId);
    // console.log(item);



    let relativeComponent;
    let relativeComponentIndex;

    components.forEach((c: any, index: number) => {
      if (c.id === relativeComponentId) {
        relativeComponent = c;
        // console.log('Added before');
        relativeComponentIndex = index;
      }
    });

    // console.log("RelativeComponent Index", relativeComponentIndex);

    if (typeof (relativeComponentIndex) === 'number' && relativeComponentIndex >= 0) {

      // console.log("Inside splicing op");

      components.splice(relativeComponentIndex, 0, item)
    }

    if (!relativeComponent) {
      components.forEach((c: any) => {
        if (c.components) {
          this.dropOnBeforeDiv(c.components, relativeComponentId, item)
        }
      });
    }

  }


  // dropOnAfterDiv(components: any, relativeComponentId: string, item: any) {

  //   // console.log(this.components);


  //   let relativeComponent;
  //   let relativeComponentIndex;


  //   components.forEach((c: any, index: number) => {
  //     if (c.id === relativeComponentId) {
  //       relativeComponent = c;
  //       // console.log('Added after');
  //       // components.splice(index + 1, 0, item);
  //       relativeComponentIndex = index;

  //     }
  //   });

  //   if (typeof (relativeComponentIndex) === 'number' && relativeComponentIndex >= 0) {
  //     components.splice(relativeComponentIndex + 1, 0, item)

  //   }


  //   if (!relativeComponent) {
  //     components.forEach((c: any) => {
  //       if (c.components) {
  //         this.dropOnAfterDiv(c.components, relativeComponentId, item)
  //       }
  //     });
  //   }

  // }


  // dropOnZone(components: any, zoneId: string, item: any) {

  //   let pushed = false;
  //   components.forEach((c: any) => {
  //     if (c.dropZoneId === zoneId) {
  //       c.components.push(item);
  //       pushed = true;
  //     }
  //   });

  //   if (!pushed) {
  //     components.forEach((c: any) => {
  //       if (c.components) {
  //         this.dropOnZone(c.components, zoneId, item)
  //       }
  //     });
  //   }
  // }



}
