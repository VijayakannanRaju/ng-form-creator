import { Injectable } from '@angular/core';
import { FormComponentMetadata } from './form.type';

@Injectable({
  providedIn: 'root'
})
export class FormMetadataService {

  formProperties!: {
    id: string,
    name: string,
    layout: 'SINGLE_PAGE_FORM | MULTI_PAGE_FORM',
    submitAction: 'CONSOLE_PRINT' | 'HTTP_CALL',
    httpAction?: null
  };

  formPages!: {
    id: string,
    order: number,
    components: FormComponentMetadata
  }[];

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
