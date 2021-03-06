import { FormArray } from '@angular/forms';
import { DynamicFormFieldValidatorType } from '../dynamic-form-field/dynamic-form-field-validator-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormArrayValidatorFn } from './dynamic-form-array-validator';

export interface DynamicFormArrayValidatorType extends DynamicFormFieldValidatorType<FormArray> {}

export function dynamicFormArrayMinLengthValidatorFactory(minLength?: number): DynamicFormArrayValidatorFn {
  const validatorFn = (array: FormArray) => {
    return array.value && array.value.length < minLength
      ? { minlengthArray: { requiredLength: minLength, actualLength: array.value.length } }
      : null;
  };
  return Number.isFinite(minLength) ? validatorFn : undefined;
}

export const dynamicFormArrayMinLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'minLength',
  factory: dynamicFormArrayMinLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayMaxLengthValidatorFactory(maxLength?: number): DynamicFormArrayValidatorFn {
  const validatorFn = (array: FormArray) => {
    return array.value && array.value.length > maxLength
      ? { maxlengthArray: { requiredLength: maxLength, actualLength: array.value.length } }
      : null;
  };
  return Number.isFinite(maxLength) ? validatorFn : undefined;
}

export const dynamicFormArrayMaxLengthValidatorType: DynamicFormArrayValidatorType = {
  type: 'maxLength',
  factory: dynamicFormArrayMaxLengthValidatorFactory,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayValidatorTypes: DynamicFormArrayValidatorType[] = [
  dynamicFormArrayMinLengthValidatorType,
  dynamicFormArrayMaxLengthValidatorType
];
