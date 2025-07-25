import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { InputComponentDragService } from '../input-component-drag.service';
import { SelectedFormElementService } from '../selected-form-element.service';
import { FormMetadataService } from '../form-metadata.service';
import { Form } from '@angular/forms';
import { HighlightDirective } from '../drag-highlight.directive';
import { BorderTopDirective } from '../border-top.directive';
// Shared Interface for form component metadata
export interface FormComponent {
  type: string;
  metadata: any;
  children?: FormComponent[];
}

@Component({
  selector: 'app-gg-form-structure',
  imports: [CommonModule, HighlightDirective, BorderTopDirective],
  templateUrl: './gg-form-structure.component.html',
  styleUrl: './gg-form-structure.component.scss',
  standalone: true
})
export class GgFormStructureComponent {
  @Input() components: any = [];
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
    console.log("Dropped Data", data);

    let item;

    // if (!data.components?.length) {
    item = {
      ...data,
      components: data.components ?
        JSON.parse(JSON.stringify(data.components)) :
        (['FORM_GROUP', 'FORM_ARRAY'].includes(data.type) ? [] : undefined)
    };
    // }

    console.log("Parsed Item", item);



    console.log('Drop event:', event);


    const droppedElement = event.target as HTMLElement;
    console.log('Dropped On Element ID', droppedElement.id);


    //console.log("Dropped in Zone");
    if (droppedElement.classList.contains('drop-zone')) {
      console.log('Dropped on zone:', droppedElement.id);
      console.log(this.components);

      this.components.push(JSON.parse(JSON.stringify(item)));
      // this.dropOnZone(this.components, droppedElement.id, item);
    }
    // else {
    //   console.log('Not dropped in a valid zone');
    // }


    // console.log("Dropped near Component");
    // console.log(droppedElement.classList);


    // if (droppedElement.classList.contains('drop-item')) {

    if (droppedElement.id.includes('-label')) {
      console.log('Dropped on LABEL:', droppedElement.id);
      // this.components.push(item);
      this.dropOnBeforeDiv(this.components, droppedElement.id.split('-label')[0], item)

    }
    // else {
    //   console.log('Dropped on non-target area inside drop zone');
    // }


    if (droppedElement.classList.contains('before-drop-item')) {
      console.log('Dropped on before :', droppedElement.id);
      this.dropOnBeforeDiv(this.components, droppedElement.id.split('-before')[0], item)
    }


    if (droppedElement.classList.contains('after-drop-item')) {
      console.log('Dropped on  after:', droppedElement.id);
      this.dropOnAfterDiv(this.components, droppedElement.id.split('-after')[0], item)
    }








    // 🚀 Emit updated structure to parent
    // this.structureChanged.emit(this.components);
  }



  componentSelected(event: Event, c: any) {
    event.stopPropagation();
    console.log('Component selected:', c);
    this.selectedFormElementService.selectedElement = c;
  }


  onDragStart(event: DragEvent, item: any) {
    event.stopPropagation();
    this.inputComponentDragService.setData(item);
    console.log(item);
    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Optional
    this.removeComponent(item.id, this.formMetadataService.components); // Remove the component from the list

  }

  removeComponent(id: any, components: any) {

    console.log('Removing Component with ID:', id);

    components.forEach((c: any, index: number) => {
      if (c.id == id) {
        console.log('Component found at index:', index);
        components.splice(index, 1); // Remove the component from the array
      } else if (c.components) {
        this.removeComponent(id, c.components); // Recursively search in children
      }

    });
  }


  dropOnBeforeDiv(components: any, relativeComponentId: string, item: any) {

    console.log(this.components);
    console.log(relativeComponentId);
    console.log(item);



    let relativeComponent;
    let relativeComponentIndex;

    components.forEach((c: any, index: number) => {
      if (c.id === relativeComponentId) {
        relativeComponent = c;
        console.log('Added before');
        relativeComponentIndex = index;
      }
    });

    console.log("RelativeComponent Index", relativeComponentIndex);

    if (typeof (relativeComponentIndex) === 'number' && relativeComponentIndex >= 0) {

      console.log("Inside splicing op");

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


  dropOnAfterDiv(components: any, relativeComponentId: string, item: any) {

    console.log(this.components);


    let relativeComponent;
    let relativeComponentIndex;


    components.forEach((c: any, index: number) => {
      if (c.id === relativeComponentId) {
        relativeComponent = c;
        console.log('Added after');
        // components.splice(index + 1, 0, item);
        relativeComponentIndex = index;

      }
    });

    if (typeof (relativeComponentIndex) === 'number' && relativeComponentIndex >= 0) {
      components.splice(relativeComponentIndex + 1, 0, item)

    }


    if (!relativeComponent) {
      components.forEach((c: any) => {
        if (c.components) {
          this.dropOnAfterDiv(c.components, relativeComponentId, item)
        }
      });
    }

  }


  dropOnZone(components: any, zoneId: string, item: any) {

    let pushed = false;
    components.forEach((c: any) => {
      if (c.dropZoneId === zoneId) {
        c.components.push(item);
        pushed = true;
      }
    });

    if (!pushed) {
      components.forEach((c: any) => {
        if (c.components) {
          this.dropOnZone(c.components, zoneId, item)
        }
      });
    }
  }

  draggedOnZone(event: DragEvent, action: 'enter' | 'leave') {
    event.preventDefault();
    event.stopPropagation();
    console.log(action);
    console.log((event.target as HTMLElement).id);


  }


}
