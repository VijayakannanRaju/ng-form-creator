import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gg-form-creator-nav-bar',
  imports: [RouterModule],
  templateUrl: './gg-form-creator-nav-bar.component.html',
  styleUrl: './gg-form-creator-nav-bar.component.scss'
})
export class GgFormCreatorNavBarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMobileMenu() {
    this.menuOpen = false;
  }
}