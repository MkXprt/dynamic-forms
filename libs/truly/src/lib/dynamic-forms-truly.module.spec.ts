import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormBuilder, DynamicFormComponentFactory, DynamicFormConfig, DynamicFormConfigService,
  DynamicFormExpressionBuilder, DynamicFormValidationBuilder, DynamicFormValidationService,
  DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { tlDynamicFormConfig } from './dynamic-forms-truly.config';
import { TlDynamicFormsModule } from './dynamic-forms-truly.module';

describe('TlDynamicFormsModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TlDynamicFormsModule
        ]
      }).compileComponents();
    }));

    it('does not provide DYNAMIC_FORM_CONFIG', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_CONFIG)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.get(DynamicFormConfigService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormBuilder', () => {
      expect(() => TestBed.get(DynamicFormBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormExpressionBuilder', () => {
      expect(() => TestBed.get(DynamicFormExpressionBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.get(DynamicFormValidationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.get(DynamicFormValidationService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormComponentFactory', () => {
      expect(() => TestBed.get(DynamicFormComponentFactory)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('forRoot with defaultconfig', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TlDynamicFormsModule.forRoot()
        ]
      }).compileComponents();
    }));

    it('provides DYNAMIC_FORM_CONFIG',
      inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(tlDynamicFormConfig);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.config).toEqual(tlDynamicFormConfig);
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

  describe('forRoot with provided config', () => {
    const config: DynamicFormConfig = {
      module: 'truly'
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TlDynamicFormsModule.forRoot(config)
        ]
      }).compileComponents();
    }));

    it('provides DYNAMIC_FORM_CONFIG',
      inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(config);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.config).toEqual(config);
      })
    );
  });
});
