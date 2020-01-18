import { async, inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormGroupType, DynamicFormGroupModule } from './dynamic-form-group.module';

describe('DynamicFormGroupModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormGroupModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_TYPES',
    inject([DYNAMIC_FORM_FIELD_TYPES], (types: DynamicFormFieldTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormGroupType);
      expect(types[0].library).toBe(dynamicFormLibrary);
    })
  );
});
