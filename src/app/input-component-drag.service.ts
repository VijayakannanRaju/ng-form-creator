
// input-component-drag.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InputComponentDragService {
  private data: any = null;

  setData(item: any) {
    this.data = item;
  }

  getData() {
    return this.data;
  }
}

// Shared Interface for form component metadata
export interface FormComponent {
  type: string;
  metadata: any;
  children?: FormComponent[];
}