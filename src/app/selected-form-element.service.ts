import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedFormElementService {

  public selectedElement: any = null;

  constructor() { }
}
