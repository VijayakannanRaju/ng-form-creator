import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponentDragService } from '../input-component-drag.service';
import { SelectedFormElementService } from '../selected-form-element.service';
import { FormMetadataService } from '../form-metadata.service';
import { Form } from '@angular/forms';

// Shared Interface for form component metadata
export interface FormComponent {
  type: string;
  metadata: any;
  children?: FormComponent[];
}

@Component({
  selector: 'app-gg-form-structure',
  imports: [CommonModule],
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
    private formMetadataService: FormMetadataService
  ) { }
  onDragOver(event: DragEvent, c?: any) {
    event.preventDefault(); // Necessary to allow dropping

  }


  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Drop event:', event);


    const droppedElement = event.target as HTMLElement;

    console.log("Dropped in Zone");
    if (droppedElement.classList.contains('drop-zone')) {
      console.log('Dropped on zone:', droppedElement.id);
    } else {
      console.log('Not dropped in a valid zone');
    }


    console.log("Dropped near Component");
    console.log(droppedElement.classList);

    if (droppedElement.classList.contains('drop-item')) {
      console.log('Dropped on child:', droppedElement.id);
    } else {
      console.log('Dropped on non-target area inside drop zone');
    }




    const data = this.inputComponentDragService.getData();

    const newItem = {
      ...data,
      components: ['FORM_GROUP', 'FORM_ARRAY'].includes(data.type) ? [] : undefined
    };


    this.components.push(newItem);

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



}
