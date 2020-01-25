import { Component } from '@angular/core';
import { DynamicFormInputBase, DynamicFormNumberbox, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'tl-dynamic-form-numberbox',
  templateUrl: './dynamic-form-numberbox.component.html'
})
export class TlDynamicFormNumberboxComponent extends DynamicFormInputBase<DynamicFormNumberbox> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

