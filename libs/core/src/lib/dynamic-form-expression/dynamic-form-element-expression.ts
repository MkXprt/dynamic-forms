import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormExpression, DynamicFormExpressionFunc } from './dynamic-form-expression';

export type DynamicFormElementExpressionFunc<
  Data extends DynamicFormElementExpressionData = DynamicFormElementExpressionData
> = DynamicFormExpressionFunc<Data>;

export class DynamicFormElementExpression implements DynamicFormExpression<
  DynamicFormElementExpressionData, DynamicFormElementExpressionFunc
> {

  constructor(
    readonly key: string,
    readonly element: DynamicFormElement,
    readonly func: DynamicFormElementExpressionFunc
  ) {}

  get value(): any { return this.func(this.element.expressionData); }
}
