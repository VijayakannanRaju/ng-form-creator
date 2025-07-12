import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponentDragService } from '../input-component-drag.service';



@Component({
  selector: 'app-gg-input-selection',
  imports: [CommonModule],
  templateUrl: './gg-input-selection.component.html',
  styleUrl: './gg-input-selection.component.scss',
  standalone: true
})
export class GgInputSelectionComponent {

  inputList = [
    {
      name: 'formgroup',
      displayName: 'Form Group',
      type: 'FORM_GROUP',
    },

    {
      name: 'formarray',
      displayName: 'Form Array',
      type: 'FORM_ARRAY',
    },

    {
      name: 'textbox',
      displayName: 'Text box',
      type: 'TEXT_BOX'
    },
    {
      name: 'textarea',
      displayName: 'Text area',
      type: 'TEXT_AREA'
    },
  ];

  constructor(private inputComponentDragService: InputComponentDragService) { }

  onDragStart(event: DragEvent, item: any) {
    this.inputComponentDragService.setData(item);
    console.log(item);

    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Optional
  }

}
