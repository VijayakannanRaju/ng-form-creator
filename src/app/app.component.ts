import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GgNavBar } from "./gg-nav-bar/gg-nav-bar";
import { GgFormCreatorNavBarComponent } from './gg-form-creator-nav-bar/gg-form-creator-nav-bar.component';
import { GgInputSelectionComponent } from './gg-input-selection/gg-input-selection.component';
import { GgFormStructureComponent } from './gg-form-structure/gg-form-structure.component';
import { GgInputConfigurationComponent } from './gg-input-configuration/gg-input-configuration.component';
import { JsonPipe } from '@angular/common';

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

  onStructureChange(newStructure: any[]) {
    this.formStructure = newStructure;
  }


}
