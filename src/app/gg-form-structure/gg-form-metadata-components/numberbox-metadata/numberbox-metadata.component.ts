import { Component, Input } from '@angular/core';
import { NumberboxMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numberbox-metadata',
  imports: [CommonModule],
  templateUrl: './numberbox-metadata.component.html',
  styleUrl: './numberbox-metadata.component.scss',
  standalone: true
})
export class NumberboxMetadataComponent {
  @Input('component') c!: NumberboxMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
