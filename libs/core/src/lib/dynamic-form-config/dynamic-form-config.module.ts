import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormElementType, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldType, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperType, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputType, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationConfig, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@NgModule({})
export class DynamicFormConfigModule {
  static forLibrary(library: DynamicFormLibrary): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: library
        }
      ]
    };
  }

  static withValidation(validationConfig: DynamicFormValidationConfig) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_VALIDATION_CONFIGS,
          useValue: validationConfig,
          multi: true
        }
      ]
    };
  }

  static withElement(elementType: DynamicFormElementType): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ELEMENT_TYPES,
          useValue: elementType,
          multi: true
        }
      ]
    };
  }

  static withField(fieldType: DynamicFormFieldType) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_TYPES,
          useValue: fieldType,
          multi: true
        }
      ]
    };
  }

  static withInput(inputType: DynamicFormInputType) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_INPUT_TYPES,
          useValue: inputType,
          multi: true
        }
      ]
    };
  }

  static withFieldWrapper(fieldWrapperType: DynamicFormFieldWrapperType) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_WRAPPER_TYPES,
          useValue: fieldWrapperType,
          multi: true
        }
      ]
    };
  }
}
