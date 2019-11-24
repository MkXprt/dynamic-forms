import { Type } from '@angular/core';
import { DynamicFormArrayComponent } from '../dynamic-form-array/dynamic-form-array.component';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';
import { DynamicFormGroupComponent } from '../dynamic-form-group/dynamic-form-group.component';
import { DynamicFormFieldWrapper } from './dynamic-form-field-wrapper';

export interface DynamicFormFieldTypeConfig {
  type: string;
  component: Type<DynamicFormFieldWrapper>;
  wrappers?: string[];
}

export interface DynamicFormFieldConfig {
  types: DynamicFormFieldTypeConfig[];
}

export const dynamicFormFieldConfig: DynamicFormFieldConfig = {
  types: [
    { type: 'group', component: DynamicFormGroupComponent },
    { type: 'array', component: DynamicFormArrayComponent },
    { type: 'control', component: DynamicFormControlComponent }
  ]
};
