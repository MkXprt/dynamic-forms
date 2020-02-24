import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService } from '../../dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from '../../dynamic-form-config/dynamic-form-library';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormButtonDefinition } from './dynamic-form-button-definition';
import { DynamicFormButtonTemplate } from './dynamic-form-button-template';
import { DynamicFormButtonComponent } from './dynamic-form-button.component';

describe('DynamicFormButtonComponent', () => {
  let fixture: ComponentFixture<DynamicFormButtonComponent>;
  let component: DynamicFormButtonComponent;
  let element: DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormButtonComponent
      ],
      providers: [
        { provide: DYNAMIC_FORM_LIBRARY, useValue: { name: 'test' } },
        DynamicFormConfigService,
        { provide: DynamicFormBuilder, useValue: {} },
        DynamicFormActionService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormButtonComponent);
    component = fixture.componentInstance;

    const root = <DynamicFormField>{};
    const parent = <DynamicFormField>{};
    const template = <DynamicFormButtonTemplate>{ label: 'label' };
    const definition = <DynamicFormButtonDefinition>{ type: 'element', template };
    element = new DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>(root, parent, definition);
    component.element = element;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.template.label).toBe('label');
  });

  it('creates component template', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement).toBeDefined();
    expect(formButtonElement.type).toBe('button');
    expect(formButtonElement.innerHTML).toBe('label');
  });

  it('sets dynamic form button to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-button');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button hidden');
  });

  it('sets class name of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-button');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button');
  });

  it('sets type of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.type).toBe('button');

    component.template.type = 'submit';
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('submit');

    component.template.type = 'reset';
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('reset');

    component.template.type = 'button';
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('button');

    component.template.type = null;
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('button');
  });

  it('executes action onClick',
    inject([DynamicFormActionService], (handler: DynamicFormActionService) => {
      spyOn(handler, 'handle');

      const event = null;
      component.onClick(event);

      expect(handler.handle).toHaveBeenCalledWith(component.element, event);
    })
  );
});
