import { Component, Input } from '@angular/core';
import { DescriptionMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description-metadata',
  imports: [CommonModule],
  templateUrl: './description-metadata.component.html',
  styleUrl: './description-metadata.component.scss',
  standalone: true
})
export class DescriptionMetadataComponent {
  @Input('component') c!: DescriptionMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
