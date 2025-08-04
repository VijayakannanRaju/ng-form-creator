import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HeadingMetadata } from '../../../form.type';
import { InputComponentDragService } from '../../../input-component-drag.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heading-metadata',
  imports: [CommonModule, FormsModule],
  templateUrl: './heading-metadata.component.html',
  styleUrl: './heading-metadata.component.scss',
  standalone: true
})
export class HeadingMetadataComponent {
  @Input('component') c!: HeadingMetadata;
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  showNameInput: boolean = false;

  constructor(public inputComponentDragService: InputComponentDragService) { }

  ngAfterViewChecked(): void {
    if (this.showNameInput && this.nameInputRef) {
      this.nameInputRef.nativeElement.focus();
      //this.showNameInput = false;
    }
  }


}
