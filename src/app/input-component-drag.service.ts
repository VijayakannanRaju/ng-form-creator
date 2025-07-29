
// input-component-drag.service.ts
import { Injectable } from '@angular/core';
import { FormComponentMetadata } from './form.type';

@Injectable({ providedIn: 'root' })
export class InputComponentDragService {
  private data: FormComponentMetadata | null = null;
  public showOverlay: boolean = false; // Flag to control overlay visibility

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