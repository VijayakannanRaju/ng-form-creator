import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DescriptionMetadata } from '../../form.type';

@Component({
  selector: 'app-description',
  imports: [CommonModule],
  templateUrl: './description.html',
  styleUrl: './description.scss',
  standalone: true
})
export class Description {
  @Input() descriptionData: DescriptionMetadata  | undefined; // Default value is optional

}
