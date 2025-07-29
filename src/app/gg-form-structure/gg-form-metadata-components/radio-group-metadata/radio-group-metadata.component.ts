import { Component, Input } from '@angular/core';
import { RadioGroupMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-group-metadata',
  imports: [CommonModule],
  templateUrl: './radio-group-metadata.component.html',
  styleUrl: './radio-group-metadata.component.scss',
  standalone: true
})
export class RadioGroupMetadataComponent {
  @Input('component') c!: RadioGroupMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
