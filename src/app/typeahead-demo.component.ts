import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadWithHttpCallComponent } from './form-components/typeahead-with-http-call/typeahead-with-http-call.component';
import { TypeAheadWithHttpCallMetadata } from './form.type';

@Component({
  selector: 'app-typeahead-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TypeaheadWithHttpCallComponent],
  template: `
    <div class="demo-container">
      <h2>Typeahead Component Demo</h2>
      
      <form [formGroup]="demoForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <app-typeahead-with-http-call
            [metadata]="typeaheadMetadata"
            formControlName="searchField"
            [required]="true">
          </app-typeahead-with-http-call>
        </div>
        
        <div class="form-actions">
          <button type="submit" [disabled]="!demoForm.valid">Submit</button>
          <button type="button" (click)="resetForm()">Reset</button>
        </div>
      </form>
      
      <div class="form-data" *ngIf="formData">
        <h3>Form Data:</h3>
        <pre>{{ formData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #ffffff;
    }
    
    h2 {
      color: #111827;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    button[type="submit"] {
      background-color: #2563eb;
      color: white;
    }
    
    button[type="submit"]:hover:not(:disabled) {
      background-color: #1d4ed8;
    }
    
    button[type="submit"]:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
    
    button[type="button"] {
      background-color: #6b7280;
      color: white;
    }
    
    button[type="button"]:hover {
      background-color: #4b5563;
    }
    
    .form-data {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #f9fafb;
      border-radius: 0.375rem;
    }
    
    .form-data h3 {
      margin-top: 0;
      color: #374151;
    }
    
    pre {
      background-color: #ffffff;
      padding: 1rem;
      border-radius: 0.375rem;
      border: 1px solid #e5e7eb;
      overflow-x: auto;
      font-size: 0.875rem;
    }
  `]
})
export class TypeaheadDemoComponent {
  demoForm: FormGroup;
  formData: any = null;
  
  typeaheadMetadata: TypeAheadWithHttpCallMetadata = {
    id: 'demo-typeahead',
    type: 'TYPEAHEAD_WITH_HTTP_CALL',
    name: 'searchField',
    displayLabel: 'Search Users',
    displayName: 'User Search',
    required: true,
    placeholder: 'Type to search users...',
    arrayInResponsePath: '', // Empty string means the response is the array directly
    optionDisplayLabelKeyInArray: 'name', // JSONPlaceholder uses 'name', not 'fullName'
    optionValueKeyInArray: 'id',
    httpCallUrl: 'https://jsonplaceholder.typicode.com/users',
    httpCallMethod: 'GET',
    iconName: 'typeahead-with-http-call.png',
    showMetadataDiv: false,
    containerWidthInLargeScreen: 'full-width',
    containerWidthInMediumScreen: 'full-width',
    containerWidthInSmallScreen: 'full-width',
    componentWidthInLargeScreen: 12,
    componentWidthInMediumScreen: 12,
    componentWidthInSmallScreen: 12
  };

  // Example of different arrayInResponsePath configurations:
  // 
  // 1. Direct array response (current demo):
  //    arrayInResponsePath: '' 
  //    Response: [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
  //
  // 2. Nested object with array:
  //    arrayInResponsePath: 'data.users'
  //    Response: {data: {users: [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]}}
  //
  // 3. Deep nested path:
  //    arrayInResponsePath: 'response.data.users'
  //    Response: {response: {data: {users: [{id: 1, name: 'John'}]}}}
  //
  // 4. Array with index:
  //    arrayInResponsePath: 'companies[0].employees'
  //    Response: {companies: [{employees: [{id: 1, name: 'John'}]}, {employees: []}]}

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      searchField: ['']
    });
  }

  onSubmit() {
    if (this.demoForm.valid) {
      this.formData = this.demoForm.value;
      console.log('Form submitted:', this.formData);
    }
  }

  resetForm() {
    this.demoForm.reset();
    this.formData = null;
  }
}
