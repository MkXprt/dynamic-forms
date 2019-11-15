import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormInput } from './dynamic-form-input';

export abstract class DynamicFormInputComponent<FormInput extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldWrapper<DynamicFormControl<FormInput>> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get template() { return this.field.template; }

  get input() { return this.template.input; }
  get hints() { return this.template.hints; }
  get validation() { return this.template.validation; }
}
