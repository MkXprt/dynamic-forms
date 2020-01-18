import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { matDynamicFormComboboxType, MatDynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('MatDynamicFormComboboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormComboboxModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_TYPES',
    inject([DYNAMIC_FORM_INPUT_TYPES], (types: DynamicFormInputTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(matDynamicFormComboboxType);
      expect(types[0].library).toEqual(matDynamicFormLibrary);
    })
  );
});
