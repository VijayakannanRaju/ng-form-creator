import { Component, Input } from '@angular/core';
import { FormGroupMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-group-metadata',
  imports: [CommonModule],
  templateUrl: './form-group-metadata.component.html',
  styleUrl: './form-group-metadata.component.scss',
  standalone: true
})
export class FormGroupMetadataComponent {
  @Input('component') c!: FormGroupMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
