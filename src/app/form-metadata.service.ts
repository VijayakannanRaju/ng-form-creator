import { Injectable } from '@angular/core';
import { FormComponentMetadata } from './form.type';

@Injectable({
  providedIn: 'root'
})
export class FormMetadataService {

  components: FormComponentMetadata[] = []

  constructor() { }

  // setComponent(components: FormComponentMetadata[]): FormComponentMetadata[] {
  //   this.components = components;
  //   return this.components;
  // }

  // getComponents(): FormComponentMetadata[] {
  //   return this.components;
  // }
}
