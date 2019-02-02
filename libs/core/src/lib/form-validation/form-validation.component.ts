import { Component, Input, Inject } from '@angular/core';
import { FormValidationErrors } from './form-validation.model';
import { FORM_CONFIG } from '../form/form.config';
import { FormConfig } from '../form/models/form.config';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './form-validation.component.html'
})
export class FormValidationComponent {
  @Input()
  errors: FormValidationErrors;

  constructor(@Inject(FORM_CONFIG) private formConfig: FormConfig) {}

  get message() {
    const key = Object.keys(this.errors)[0];
    const error = this.errors[key];
    return error && error.message ? error.message : this.getMessage(key);
  }

  private getMessage(key: string) {
    const config = this.formConfig.validationConfig;
    return config.messages[key] || config.defaultMessage;
  }
}
