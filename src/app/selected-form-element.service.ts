import { Injectable } from '@angular/core';
import { FormComponentMetadata } from './form.type';

@Injectable({
  providedIn: 'root'
})
export class SelectedFormElementService {

  public selectedElement!: FormComponentMetadata;

  constructor() { }
}
