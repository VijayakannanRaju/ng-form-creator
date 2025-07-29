import { Component, Input } from '@angular/core';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';
import { DateTimeMetadata } from '../../../form.type';

@Component({
  selector: 'app-date-time-metadata',
  imports: [CommonModule],
  templateUrl: './date-time-metadata.component.html',
  styleUrl: './date-time-metadata.component.scss',
  standalone: true
})
export class DateTimeMetadataComponent {
  @Input('component') c!: DateTimeMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
