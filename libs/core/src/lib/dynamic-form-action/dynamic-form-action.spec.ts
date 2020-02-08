import { DynamicFormActionExpression } from '../dynamic-form-expression/dynamic-form-action-expression';
import { DynamicFormActionExpressions } from '../dynamic-form-expression/dynamic-form-action-expressions';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';

describe('DynamicFormAction', () => {
  it('new instance', () => {
    const root = <DynamicFormField>{};
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: {}, elements: [] };
    const formAction = new DynamicFormAction(root, parent, definition);

    expect(formAction.root).toBe(root);
    expect(formAction.parent).toBe(parent);
    expect(formAction.definition).toBe(definition);
    expect(formAction.template).toBe(definition.template);

    expect(formAction.classType).toBe('action');
    expect(formAction.componentType).toBe('componentType');

    expect(formAction.elements).toEqual([]);

    expect(formAction.expressions).toEqual({});
  });

  it('inits expressions', () => {
    const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: {}, elements: [] };
    const formAction = new DynamicFormAction(null, null, definition);
    const actionExpressions = <DynamicFormActionExpressions>{
      'hidden': <DynamicFormActionExpression>{ value: true },
      'disabled': <DynamicFormActionExpression>{ value: false }
    };

    formAction.initExpressions(actionExpressions);

    expect(formAction.expressions).toBe(actionExpressions);
    expect(formAction.template['hidden']).toBe(true);
    expect(formAction.template['disabled']).toBe(false);
  });
});
