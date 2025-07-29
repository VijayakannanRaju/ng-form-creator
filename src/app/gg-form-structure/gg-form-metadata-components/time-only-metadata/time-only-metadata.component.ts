import { Component, Input } from '@angular/core';
import { TimeOnlyMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-only-metadata',
  imports: [CommonModule],
  templateUrl: './time-only-metadata.component.html',
  styleUrl: './time-only-metadata.component.scss',
  standalone: true
})
export class TimeOnlyMetadataComponent {
  @Input('component') c!: TimeOnlyMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
