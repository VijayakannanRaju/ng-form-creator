import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragHighlightService {
  hoveredPath: string | null = null;

  setHover(path: string) {
    this.hoveredPath = path;
  }

  clearHover() {
    this.hoveredPath = null;
  }

  isHovered(path: string): boolean {
    return this.hoveredPath === path;
  }
}
