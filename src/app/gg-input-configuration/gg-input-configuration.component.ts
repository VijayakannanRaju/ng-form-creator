import { Component } from '@angular/core';
import { SelectedFormElementService } from '../selected-form-element.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gg-input-configuration',
  imports: [CommonModule],
  templateUrl: './gg-input-configuration.component.html',
  styleUrl: './gg-input-configuration.component.scss',
  standalone: true

})
export class GgInputConfigurationComponent {


  constructor(
    public selectedFormElementService: SelectedFormElementService
  ) { }
  changeLabel() {
    if (this.selectedFormElementService.selectedElement) {
      this.selectedFormElementService.selectedElement.displayLabel = 'Label Changed';
      this.selectedFormElementService.selectedElement.displayName = 'NAme Changed';

    }
  }

}
