import { DynamicFormExpressionData } from './dynamic-form-expression-data';
import { DynamicFormExpressionMemoization } from './dynamic-form-expression-memoization';

export type DynamicFormExpressionFunc<Data extends DynamicFormExpressionData = DynamicFormExpressionData> =
  (data: Data, memo?: DynamicFormExpressionMemoization) => any;

export interface DynamicFormExpression<
  Data extends DynamicFormExpressionData = DynamicFormExpressionData,
  Func extends DynamicFormExpressionFunc<Data> = DynamicFormExpressionFunc<Data>
> {
  readonly key: string;
  readonly value: any;
  readonly func: Func;
}

export const dynamicFormExpressionArgs = [ 'data', 'memo' ];
