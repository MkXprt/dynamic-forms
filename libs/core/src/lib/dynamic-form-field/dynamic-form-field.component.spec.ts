import { Component, NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DYNAMIC_FORM_CONFIG } from '../dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldComponent } from './dynamic-form-field.component';

class DynamicFormFieldTest extends DynamicFormField {
  get expressions() { return this._expressions; }

  check() {}
  destroy() {}
}

@Component({
  selector: 'dynamic-field-test',
  template: `<div>Dynamic Field</div>`
})
class DynamicFormFieldTestComponent extends DynamicFormFieldBase {}

@NgModule({
  declarations: [
    DynamicFormFieldComponent,
    DynamicFormFieldTestComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: {
        module: 'test',
        fieldConfig: {
          types: [
            { type: 'field', component: DynamicFormFieldTestComponent }
          ]
        }
      }
    },
    DynamicFormConfigService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFormFieldTestComponent
  ]
})
class DynamicFormComponentFactoryTestModule {}

describe('DynamicFormFormFieldComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComponentFactoryTestModule
      ]
    }).compileComponents();
  }));

  it('creates component', () => {
    const template = <DynamicFormFieldTemplate>{ key: 'key', type: 'field' };
    const field = new DynamicFormFieldTest(null, null, template);
    const fixture = TestBed.createComponent(DynamicFormFieldComponent);
    const component = fixture.componentInstance;
    component.field = field;

    fixture.detectChanges();

    expect(component.id).toBe('key');
    expect(component.field).toBe(field);
    expect(component.template).toBe(template);
  });
});
