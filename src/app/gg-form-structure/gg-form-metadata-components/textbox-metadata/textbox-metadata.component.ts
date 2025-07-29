import { Component, Input } from '@angular/core';
import { TextboxMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textbox-metadata',
  imports: [CommonModule],
  templateUrl: './textbox-metadata.component.html',
  styleUrl: './textbox-metadata.component.scss',
  standalone: true
})
export class TextboxMetadataComponent {
  @Input('component') c!: TextboxMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
