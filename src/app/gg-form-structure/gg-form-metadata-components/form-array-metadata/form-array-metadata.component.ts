import { Component, Input } from '@angular/core';
import { FormArrayMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-array-metadata',
  imports: [CommonModule],
  templateUrl: './form-array-metadata.component.html',
  styleUrl: './form-array-metadata.component.scss',
  standalone: true
})
export class FormArrayMetadataComponent {
  @Input('component') c!: FormArrayMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}
