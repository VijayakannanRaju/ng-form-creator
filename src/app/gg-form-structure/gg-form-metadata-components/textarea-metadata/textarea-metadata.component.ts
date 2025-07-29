import { Component, Input } from '@angular/core';
import { TextAreaMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea-metadata',
  imports: [CommonModule],
  templateUrl: './textarea-metadata.component.html',
  styleUrl: './textarea-metadata.component.scss',
  standalone: true
})
export class TextareaMetadataComponent {
  @Input('component') c!: TextAreaMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
