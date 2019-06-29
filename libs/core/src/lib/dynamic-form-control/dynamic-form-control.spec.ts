import { Validators } from '@angular/forms';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

describe('DynamicFormControl', () => {
  it('new instance', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    expect(formControl.path).toBe('key');
    expect(formControl.root).toBe(root);
    expect(formControl.parent).toBe(root);
    expect(formControl.definition).toBe(definition);
    expect(formControl.model).toBeNull();
    expect(formControl.control).toBeDefined();
    expect(formControl.template).toBe(definition.template);

    expect(root.model).toEqual({ key: null });
  });

  const defaultValues = [ 'default', 0, false, ''];
  defaultValues.forEach(defaultValue =>
    it(`new instance with default value '${defaultValue}' for model`, () => {
      const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
      const definition = <DynamicFormControlDefinition>{ key: 'key', template: { input: { defaultValue } } };
      const formControl = new DynamicFormControl(root, root, definition);

      expect(formControl.model).toBe(defaultValue);

      expect(root.model).toEqual({ key: defaultValue });
    })
  );

  it('new instance subscribes valueChanges of control value', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    formControl.control.setValue('value');

    expect(formControl.model).toBe('value');
    expect(formControl.parent.model.key).toBe('value');
  });

  it('new instance subscribes valueChanges of control object', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);
    const obj = { value: 'value' };

    formControl.control.setValue(obj);

    expect(formControl.model).toBe(obj);
    expect(formControl.parent.model.key).toBe(obj);
  });

  it('sets control validator to null', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    formControl.setValidators(null);

    expect(formControl.control.validator).toBeNull();
  });

  it('sets control validator to defined', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);
    const formControlValidators = <DynamicFormControlValidator[]>[
      {
        key: 'required', enabled: true, value: undefined,
        validator: Validators.required, factory: _ => Validators.required
      }
    ];

    formControl.setValidators(formControlValidators);

    expect(formControl.control.validator).not.toBeNull();
  });

  it('check updates control value for options', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {
      'key': 'option1'
    });
    const definition = <DynamicFormControlDefinition>{
      key: 'key',
      template: {
        input: {
          options: [
            { value: 'option1', label: 'Option1' },
            { value: 'option2', label: 'Option2' },
            {
              label: 'Option Group',
              items: [
                { value: 'option3', label: 'Option3' },
                { value: 'option4', label: 'Option4' }
              ]
            }
          ]
        }
      }
    };
    const formControl = new DynamicFormControl(root, root, definition);

    expect(formControl.model).toBe('option1');
    expect(formControl.control.value).toBe('option1');

    formControl.control.setValue('option3');
    formControl.check();

    expect(formControl.model).toBe('option3');
    expect(formControl.control.value).toBe('option3');

    formControl.template.input.options = [
      { value: 'option1', label: 'Option1' },
      { value: 'option2', label: 'Option2' }
    ];
    formControl.check();

    expect(formControl.model).toBeNull();
    expect(formControl.control.value).toBeNull();
  });

  it('check updates control disabled', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: { input: {} } };
    const formControl = new DynamicFormControl(root, root, definition);

    expect(formControl.control.disabled).toBe(false);

    formControl.template.disabled = true;
    formControl.check();

    expect(formControl.control.disabled).toBe(true);

    formControl.template.disabled = false;
    formControl.check();

    expect(formControl.control.disabled).toBe(false);
  });

  it('check updates control validators', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{
      key: 'key',
      type: 'control',
      template: {
        input: { type: 'input' },
        validation: { required: true }
      }
    };
    const formControl = new DynamicFormControl(root, root, definition);
    const formControlValidators = <DynamicFormControlValidator[]>[
      {
        key: 'required', enabled: true, value: undefined,
        validator: Validators.required, factory: _ => Validators.required
      }
    ];

    formControl.setValidators(formControlValidators);
    formControl.control.updateValueAndValidity();

    expect(formControl.control.valid).toBe(false);

    definition.template.validation.required = false;
    formControl.check();

    expect(formControl.control.valid).toBe(true);

    formControl.check();

    expect(formControl.control.valid).toBe(true);

    definition.template.validation.required = true;
    formControl.check();

    expect(formControl.control.valid).toBe(false);
  });

  it('destroy unsubscribes valueChanges of control', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    formControl.destroy();

    expect(formControl).toBeDefined();
  });
});
