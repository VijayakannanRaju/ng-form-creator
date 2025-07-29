import { Component, Input } from '@angular/core';
import { DropdownMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-metadata',
  imports: [CommonModule],
  templateUrl: './dropdown-metadata.component.html',
  styleUrl: './dropdown-metadata.component.scss',
  standalone: true
})
export class DropdownMetadataComponent {
  @Input('component') c!: DropdownMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
