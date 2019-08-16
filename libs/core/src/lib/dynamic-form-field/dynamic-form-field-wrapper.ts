import { Input } from '@angular/core';
import { DynamicFormValidationErrors } from '../dynamic-form-validation/dynamic-form-validation-errors';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormField } from './dynamic-form-field';

export abstract class DynamicFormFieldWrapper<Field extends DynamicFormField = DynamicFormField> {
  @Input() field: Field;

  constructor(protected validationService: DynamicFormValidationService) {}

  get id() { return this.field.path; }
  get template() { return this.field.template; }
  get control() { return this.field.control; }

  get errors(): DynamicFormValidationErrors {
    return this.control.errors;
  }

  get errorMessage() {
    return this.validationService.getErrorMessage(this.errors);
  }

  get showErrorMessage() {
    return this.control.touched && (this.errors || false) && true;
  }
}
