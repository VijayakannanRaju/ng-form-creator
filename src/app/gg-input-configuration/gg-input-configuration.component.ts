import { Component } from '@angular/core';
import { SelectedFormElementService } from '../selected-form-element.service';

@Component({
  selector: 'app-gg-input-configuration',
  imports: [],
  templateUrl: './gg-input-configuration.component.html',
  styleUrl: './gg-input-configuration.component.scss',
  standalone: true

})
export class GgInputConfigurationComponent {


  constructor(
    private selectedFormElementService: SelectedFormElementService
  ) { }
  toggleComponent() {
    if (this.selectedFormElementService.selectedElement) {
      this.selectedFormElementService.selectedElement.toggled = !this.selectedFormElementService.selectedElement.toggled;
      console.log('Toggled:', this.selectedFormElementService.selectedElement);

    }
  }

}
