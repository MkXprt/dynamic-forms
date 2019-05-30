import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormTextarea } from '@dynamic-forms/core';

@Component({
  selector: 'tl-dynamic-form-textarea',
  templateUrl: './dynamic-form-textarea.component.html'
})
export class DynamicFormTextareaComponent extends DynamicFormInputComponent<DynamicFormTextarea> {}
