import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormBuilder, DynamicFormComponentFactory, DynamicFormConfig, DynamicFormConfigService,
  DynamicFormExpressionBuilder, DynamicFormValidationBuilder, DynamicFormValidationService,
  DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from '@dynamic-forms/core';
import { bsDynamicFormConfig } from './dynamic-forms.config';
import { BsDynamicFormsModule } from './dynamic-forms.module';

describe('BsDynamicFormsModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          BsDynamicFormsModule
        ]
      });
    }));

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_LIBRARY)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_CONFIG for library',
      inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
        const libraryConfigs = configs.filter(cfg => cfg.library === 'bootstrap');
        expect(libraryConfigs.length).toBe(0);
      })
    );

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

  describe('forRoot with default config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          BsDynamicFormsModule.forRoot()
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: string) => {
        expect(library).toBe('bootstrap');
      })
    );

    it('provides DYNAMIC_FORM_CONFIG for library',
      inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
        const libraryConfigs = configs.filter(cfg => cfg.library === 'bootstrap');

        expect(libraryConfigs.length).toBe(1);
        expect(libraryConfigs[0]).toEqual(bsDynamicFormConfig);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.config.library).toEqual('bootstrap');
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
      library: 'bootstrap'
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          BsDynamicFormsModule.forRoot(config)
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: string) => {
        expect(library).toBe('bootstrap');
      })
    );

    it('provides DYNAMIC_FORM_CONFIG for library',
      inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
        const libraryConfigs = configs.filter(cfg => cfg.library === 'bootstrap');

        expect(libraryConfigs.length).toBe(1);
        expect(libraryConfigs[0]).toEqual(config);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.config.library).toEqual('bootstrap');
      })
    );
  });
});
