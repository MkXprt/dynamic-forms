import { InjectionToken } from '@angular/core';
import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormActionBase } from './dynamic-form-action-base';
import { DynamicFormActionFactory } from './dynamic-form-action-factory';

export interface DynamicFormActionType extends DynamicFormComponentType<DynamicFormActionBase> {
  factory?: DynamicFormActionFactory;
}

export type DynamicFormActionConfig = (DynamicFormActionType | DynamicFormActionType[])[];

export const DYNAMIC_FORM_ACTION_CONFIG = new InjectionToken<DynamicFormActionConfig>('DynamicFormActionConfig');
