import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GgNavBar } from "./gg-nav-bar/gg-nav-bar";
import { GgFormCreatorNavBarComponent } from './gg-form-creator-nav-bar/gg-form-creator-nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GgNavBar, GgFormCreatorNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-form-creator';
}
