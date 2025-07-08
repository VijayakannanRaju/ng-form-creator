import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gg-nav-bar',
  imports: [RouterModule],
  templateUrl: './gg-nav-bar.html',
  styleUrl: './gg-nav-bar.scss',
  standalone: true
})
export class GgNavBar {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMobileMenu(){
    this.menuOpen = false;
  }
}
