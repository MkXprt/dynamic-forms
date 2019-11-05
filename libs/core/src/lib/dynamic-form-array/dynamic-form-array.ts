import { FormArray } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export class DynamicFormArray extends DynamicFormField<
  FormArray, DynamicFormArrayTemplate, DynamicFormArrayDefinition> {

  protected _fields: DynamicFormField[] = [];

  constructor(definition: DynamicFormArrayDefinition, root: DynamicFormField, parent: DynamicFormField) {
    super(definition, root, parent);
    this._model = this.getModel(parent, definition);
    this._control = new FormArray([]);
  }

  get fields() { return this._fields; }

  setFields(fields: DynamicFormField[]) {
    this._fields = fields || [];
  }

  check() {
    this.fields.forEach(field => field.check());
  }

  destroy() {
    this.fields.forEach(field => field.destroy());
  }

  reset() {
    this.fields.forEach(field => field.reset());
  }

  resetDefault() {
    this.fields.forEach(field => field.resetDefault());
  }

  validate() {
    this.fields.forEach(field => field.validate());
  }

  private getModel(parent: DynamicFormField, definition: DynamicFormArrayDefinition) {
    parent.model[definition.key] = parent.model[definition.key] || [];
    return parent.model[definition.key];
  }
}
