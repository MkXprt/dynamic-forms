import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormTextbox } from '@dynamic-forms/core';

@Component({
  selector: 'clr-dynamic-form-textbox',
  templateUrl: './dynamic-form-textbox.component.html'
})
export class DynamicFormTextboxComponent extends DynamicFormInputComponent<DynamicFormTextbox> {}
