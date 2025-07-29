import { Component, Input } from '@angular/core';
import { HeadingMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heading-metadata',
  imports: [CommonModule],
  templateUrl: './heading-metadata.component.html',
  styleUrl: './heading-metadata.component.scss',
  standalone: true
})
export class HeadingMetadataComponent {
  @Input('component') c!: HeadingMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }


}
