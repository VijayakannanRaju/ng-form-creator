import { Component, Input } from '@angular/core';
import { CheckboxSingleMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-single-metadata',
  imports: [CommonModule],
  templateUrl: './checkbox-single-metadata.component.html',
  styleUrl: './checkbox-single-metadata.component.scss',
  standalone: true
})
export class CheckboxSingleMetadataComponent {
  @Input('component') c!: CheckboxSingleMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
