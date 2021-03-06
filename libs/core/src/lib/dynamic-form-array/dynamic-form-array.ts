import { FormArray } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export class DynamicFormArray<
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>
> extends DynamicFormField<FormArray, Template, Definition> {

  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicForm, parent: DynamicFormField, definition: Definition) {
    super(root, parent, definition);
    this._model = this.getModel(parent, definition);
    this._control = new FormArray([]);
    this.extendExpressionData({ length: () => this.length });
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'array'; }

  get elements(): DynamicFormElement[] { return this._elements; }
  get fields(): DynamicFormField[] { return this._fields; }

  get length(): number { return this._fields.length; }

  initElements(elements: DynamicFormField[]): void {
    this._fields = elements ? [ ...elements ] : [];
    this._fields.forEach((field, index) => {
      this._control.insert(index, field.control);
    });
    this._elements = this._fields;
  }

  pushElement(element: DynamicFormField): void {
    this._fields.push(element);
    this._control.push(element.control);
    this._control.markAsTouched();
  }

  popElement(): void {
    const length = this.length;
    if (length > 0) {
      this._fields.pop().destroy();
      this._model.pop();
      this._control.removeAt(length - 1);
      this._control.markAsTouched();
    }
  }

  clearElements(): void {
    const length = this.length;
    if (length > 0) {
      this._fields.forEach(field => field.destroy());
      this._fields = [];
      this._model = [];
      this._control.clear();
      this._control.markAsTouched();
      this._elements = this._fields;
    }
  }

  removeElement(index: number): void {
    if (index >= 0 && index < this.length) {
      this._fields.splice(index, 1).forEach(field => field.destroy());
      this._fields.forEach((field, idx) => {
        field.definition.key = `${idx}`;
        field.definition.index = idx;
      });
      this._model.splice(index, 1);
      this._control.removeAt(index);
      this._control.markAsTouched();
    }
  }

  check(): void {
    this.checkControl();
    this.checkValidators();
    this.fields.forEach(field => field.check());
  }

  destroy(): void {
    this.fields.forEach(field => field.destroy());
  }

  reset(): void {
    this.fields.forEach(field => field.reset());
  }

  resetDefault(): void {
    if (this.definition.defaultValue) {
      const defaultModel = this.cloneObject(this.definition.defaultValue);
      this._control.patchValue(defaultModel);
    } else {
      this.fields.forEach(field => field.resetDefault());
    }
  }

  validate(): void {
    this.fields.forEach(field => field.validate());
    this._control.markAsTouched();
  }

  private getModel(parent: DynamicFormField, definition: DynamicFormArrayDefinition): any {
    parent.model[definition.key] = parent.model[definition.key] || this.getDefaultModel(definition);
    return parent.model[definition.key];
  }

  private getDefaultModel(definition: DynamicFormArrayDefinition): any {
    if (definition.defaultValue) {
      return this.cloneObject(definition.defaultValue);
    }
    return Array.from({ length: definition.defaultLength || 0 });
  }
}
