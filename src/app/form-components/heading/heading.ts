import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeadingMetadata } from '../../form.type';

@Component({
  selector: 'app-heading',
  imports: [CommonModule],
  templateUrl: './heading.html',
  styleUrl: './heading.scss',
  standalone: true
})
export class Heading {
  @Input() headingData!: HeadingMetadata; // Default value is optional


}
