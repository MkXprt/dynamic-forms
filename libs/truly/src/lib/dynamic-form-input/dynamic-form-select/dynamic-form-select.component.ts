import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormSelect } from '@dynamic-forms/core';

@Component({
  selector: 'tl-dynamic-form-select',
  templateUrl: './dynamic-form-select.component.html'
})
export class DynamicFormSelectComponent extends DynamicFormInputComponent<DynamicFormSelect> {}
