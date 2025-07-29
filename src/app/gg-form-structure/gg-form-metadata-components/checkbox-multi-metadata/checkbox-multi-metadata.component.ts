import { Component, Input } from '@angular/core';
import { CheckboxMultiMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-multi-metadata',
  imports: [CommonModule],
  templateUrl: './checkbox-multi-metadata.component.html',
  styleUrl: './checkbox-multi-metadata.component.scss',
  standalone: true
})
export class CheckboxMultiMetadataComponent {
  @Input('component') c!: CheckboxMultiMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}