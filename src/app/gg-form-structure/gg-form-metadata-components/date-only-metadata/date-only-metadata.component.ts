import { Component, Input } from '@angular/core';
import { DateOnlyMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-only-metadata',
  imports: [CommonModule],
  templateUrl: './date-only-metadata.component.html',
  styleUrl: './date-only-metadata.component.scss',
  standalone: true
})
export class DateOnlyMetadataComponent {
  @Input('component') c!: DateOnlyMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
