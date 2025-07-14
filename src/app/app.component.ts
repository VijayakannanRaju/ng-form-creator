import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GgNavBar } from "./gg-nav-bar/gg-nav-bar";
import { GgFormCreatorNavBarComponent } from './gg-form-creator-nav-bar/gg-form-creator-nav-bar.component';
import { GgInputSelectionComponent } from './gg-input-selection/gg-input-selection.component';
import { GgFormStructureComponent } from './gg-form-structure/gg-form-structure.component';
import { GgInputConfigurationComponent } from './gg-input-configuration/gg-input-configuration.component';
import { JsonPipe } from '@angular/common';
import { FormMetadataService } from './form-metadata.service';

@Component({
  selector: 'app-root',
  imports: [
    GgNavBar,
    GgFormCreatorNavBarComponent,
    GgInputSelectionComponent,
    GgFormStructureComponent,
    GgInputConfigurationComponent,
    JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-form-creator';

  formStructure: any[] = [];

  constructor(public formMetadataService: FormMetadataService) {

  }

  onStructureChange(newStructure: any[]) {

    console.log("New structure received:");
    // console.log(newStructure);

    this.formStructure = this.formMetadataService.components;
  }


  currentComponent: any;
  onComponentClick(component: any) {
    console.log('Component clicked:', component);
    this.currentComponent = component;

    this.currentComponent.toggled = !this.currentComponent.toggled;
    // Here you can handle the component click event, e.g., open a configuration panel
    // or perform any other action based on the clicked component.
  }


}
