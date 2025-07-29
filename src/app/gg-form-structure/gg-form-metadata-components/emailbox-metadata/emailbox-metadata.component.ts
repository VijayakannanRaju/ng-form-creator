import { Component, Input } from '@angular/core';
import { EmailboxMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emailbox-metadata',
  imports: [CommonModule],
  templateUrl: './emailbox-metadata.component.html',
  styleUrl: './emailbox-metadata.component.scss',
  standalone: true
})
export class EmailboxMetadataComponent {
  @Input('component') c!: EmailboxMetadata;
  constructor(public inputComponentDragService: InputComponentDragService) { }

}

