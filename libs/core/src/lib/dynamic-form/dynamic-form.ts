import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormDefinition } from './dynamic-form-definition';

export class DynamicForm extends DynamicFormGroup {
  constructor(definition: DynamicFormDefinition, model: any) {
    super(null, null, definition, model);
  }

  get hidden() { return this.template.hidden || false; }
  get readonly() { return this.template.readonly || false; }
}
