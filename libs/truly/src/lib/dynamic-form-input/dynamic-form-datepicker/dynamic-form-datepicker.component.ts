import { Component } from '@angular/core';
import { DynamicFormDatepicker, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'tl-dynamic-form-datepicker',
  templateUrl: './dynamic-form-datepicker.component.html'
})
export class DynamicFormDatepickerComponent extends DynamicFormInputBase<DynamicFormDatepicker> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

