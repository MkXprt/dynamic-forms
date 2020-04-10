import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormBuilder, DynamicFormComponentFactory, DynamicFormConfigService,
  DynamicFormEvaluationBuilder, DynamicFormExpressionBuilder, DynamicFormLibrary,
  DynamicFormLibraryService, DynamicFormValidationBuilder, DynamicFormValidationService,
  DYNAMIC_FORM_LIBRARY } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';
import { MatDynamicFormsModule } from './dynamic-forms.module';

describe('MatDynamicFormsModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatDynamicFormsModule
        ]
      });
    }));

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_LIBRARY)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormLibraryService', () => {
      expect(() => TestBed.inject(DynamicFormLibraryService)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.inject(DynamicFormConfigService)).toThrowError(/NullInjectorError/);
    });

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('does not provide DynamicFormEvaluationBuilder', () => {
      expect(() => TestBed.inject(DynamicFormEvaluationBuilder)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.inject(DynamicFormValidationBuilder)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.inject(DynamicFormValidationService)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormComponentFactory', () => {
      expect(() => TestBed.inject(DynamicFormComponentFactory)).toThrowError(/NullInjectorError/);
    });
  });

  describe('forRoot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatDynamicFormsModule.forRoot()
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toEqual(matDynamicFormLibrary);
      })
    );

    it('provides DynamicFormLibraryService',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service).toBeDefined();
        expect(service.library).toEqual(matDynamicFormLibrary);
        expect(service.libraryNames).toEqual([ 'material', 'core' ]);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormBuilder',
      inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormValidationBuilder',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormValidationService',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormComponentFactory',
      inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
        expect(service).toBeDefined();
      })
    );
  });
});
