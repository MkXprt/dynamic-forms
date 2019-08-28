import { Validators } from '@angular/forms';
import { DynamicFormFieldUpdate } from '../dynamic-form-field/dynamic-form-field-options';
import { DynamicFormSelect } from '../dynamic-form-input/dynamic-form-select/dynamic-form-select';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlEvaluators } from './dynamic-form-control-evaluators';
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
    expect(formControl.template).toBe(definition.template);

    expect(formControl.model).toBeNull();
    expect(formControl.control).toBeDefined();
    expect(formControl.evaluators).toEqual([]);
    expect(formControl.validators).toEqual([]);

    expect(root.model).toEqual({ key: null });
  });

  const defaultValues = [ 'default', 0, false, '' ];
  defaultValues.forEach(defaultValue =>
    it(`new instance sets model to default value '${defaultValue}'`, () => {
      const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
      const definition = <DynamicFormControlDefinition>{ key: 'key', template: { input: { defaultValue } } };
      const formControl = new DynamicFormControl(root, root, definition);

      expect(formControl.model).toBe(defaultValue);

      expect(root.model).toEqual({ key: defaultValue });
    })
  );

  const updateOptions = [
    { value: undefined, update: undefined, updateOn: 'change' },
    { value: 'change', update: 'change', updateOn: 'change' },
    { value: 'debounce', update: 'debounce', updateOn: 'change' },
    { value: 'blur', update: 'blur', updateOn: 'blur' },
    { value: { time: 0 }, update: { time: 0 }, updateOn: 'change' },
    { value: { time: 200 }, update: { time: 200 }, updateOn: 'change' }
  ];
  updateOptions.forEach(updateOption =>
    it(`new instance sets update option '${updateOption.value}'`, () => {
      const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
      const definition = <DynamicFormControlDefinition>{ key: 'key', template: {}, options: { update: updateOption.value } };
      const formControl = new DynamicFormControl(root, root, definition);

      expect(formControl.options.update).toEqual(<DynamicFormFieldUpdate>updateOption.update);
      expect(formControl.control.updateOn).toEqual(updateOption.updateOn);
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

  it('sets evaluators to empty', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    formControl.setEvaluators(null);

    expect(formControl.evaluators).toEqual([]);
  });

  it('sets evaluators', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);
    const evaluators = [ { func: (_) => {} } ];

    formControl.setEvaluators(evaluators);

    expect(formControl.evaluators).toEqual(evaluators);
  });

  it('sets validators to empty', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    formControl.setValidators(null);

    expect(formControl.validators).toEqual([]);
  });

  it('sets validators', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);
    const formControlValidators = <DynamicFormControlValidator[]>[
      {
        key: 'required', enabled: true, parameters: undefined,
        validatorFn: Validators.required, factory: _ => Validators.required
      }
    ];

    formControl.setValidators(formControlValidators);

    expect(formControl.validators).toEqual(formControlValidators);
  });

  it('sets control validator to null', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    formControl.setValidators(null);
    formControl.control.updateValueAndValidity();

    expect(formControl.control.validator).toBeNull();
    expect(formControl.control.valid).toBe(true);
  });

  it('sets control validator', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);
    const formControlValidators = <DynamicFormControlValidator[]>[
      {
        key: 'required', enabled: true, parameters: undefined,
        validatorFn: Validators.required, factory: _ => Validators.required
      }
    ];

    formControl.setValidators(formControlValidators);
    formControl.control.updateValueAndValidity();

    expect(formControl.control.validator).not.toBeNull();
    expect(formControl.control.valid).toBe(false);
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
        key: 'required', enabled: true, parameters: undefined,
        validatorFn: Validators.required, factory: _ => Validators.required
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

  it('reset sets model to null', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , { key: 'value' });
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: {} };
    const formControl = new DynamicFormControl(root, root, definition);

    expect(formControl.model).toBe('value');
    expect(formControl.parent.model.key).toBe('value');

    formControl.reset();

    expect(formControl.model).toBe(null);
    expect(formControl.parent.model.key).toBe(null);

  });

  it('resetDefault sets model to default value', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: { input: {} } };
    const formControl = new DynamicFormControl(root, root, definition);

    expect(formControl.model).toBe(null);
    expect(formControl.parent.model.key).toBe(null);

    formControl.definition.template.input.defaultValue = 'value';
    formControl.resetDefault();

    expect(formControl.model).toBe('value');
    expect(formControl.parent.model.key).toBe('value');
  });

  it('validate calls markAsTouched of control', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormControlDefinition>{ key: 'key', template: { input: {} } };
    const formControl = new DynamicFormControl(root, root, definition);

    spyOn(formControl.control, 'markAsTouched');

    formControl.validate();

    expect(formControl.control.markAsTouched).toHaveBeenCalled();
  });

  describe('DynamicFormSelect', () => {
    it('check updates model for select options', () => {
      const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {
        'key': 'option1'
      });
      const definition = <DynamicFormControlDefinition<DynamicFormSelect>>{
        key: 'key',
        template: {
          input: {
            type: 'select',
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
      const formControl = new DynamicFormControl<DynamicFormSelect>(root, root, definition);
      formControl.setEvaluators([
        { func: DynamicFormControlEvaluators.evalSelect }
      ]);

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
  });
});
