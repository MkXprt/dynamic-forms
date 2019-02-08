import { Injectable } from '@angular/core';
import { FormArrayBuilder, FormArrayTemplate } from '../form-array';
import { FormControlBuilder, FormControlTemplate } from '../form-control';
import { FormField, FormFieldBuilder, FormFieldTemplate } from '../form-field';
import { FormGroupField } from './models/form-group-field';
import { FormGroupTemplate } from './models/form-group-template';

@Injectable()
export class FormGroupBuilder extends FormFieldBuilder<FormGroupTemplate, FormGroupField> {
  constructor(
    private formArrayBuilder: FormArrayBuilder,
    private formControlBuilder: FormControlBuilder
  ) {
      super();
  }

  createForm(template: FormGroupTemplate, model: any) {
    const field = new FormGroupField(null, null, template, model);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFields(field, field, field.template.fields));
    return field;
  }

  createField(root: FormField, parent: FormField, template: FormGroupTemplate) {
    const field = new FormGroupField(root, parent, template);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFields(root, field, template.fields));
    return field;
  }

  private createFields(root: FormField, parent: FormField, templates: FormFieldTemplate[]) {
    return (templates || []).map(template => {
      switch (template.type) {
        case 'group':
          return this.createField(root, parent, <FormGroupTemplate>template);
        case 'array':
          return this.formArrayBuilder.createField(root, parent, <FormArrayTemplate>template);
        case 'control':
          return this.formControlBuilder.createField(root, parent, <FormControlTemplate>template);
        default:
          throw Error(`Type ${ template.type } is not defined`);
      }
    });
  }
}
