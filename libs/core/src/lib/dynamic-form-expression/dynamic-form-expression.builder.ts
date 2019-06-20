import { Injectable } from '@angular/core';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpressionDependency, DynamicFormExpressionFunction } from './dynamic-form-expression';
import { DynamicFormFieldExpression } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressions} from './dynamic-form-field-expressions';

@Injectable()
export class DynamicFormExpressionBuilder {
  createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    const expressions = field.definition.expressions;
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createFieldExpression(expressions[key], field);
      return result;
    }, {}) : null;
  }

  private createFieldExpression(expression: string, field: DynamicFormField): DynamicFormFieldExpression {
    const deps = this.createFieldExpressionDependencies(expression);
    const func = this.createFieldExpressionFunction(expression);
    return new DynamicFormFieldExpression(deps, func, field);
  }

  private createFieldExpressionDependencies(expression: string): DynamicFormExpressionDependency[] {
    return DynamicFormFieldExpression.dependencyArgs.reduce((result, expressionArgument) => {
      const dependencies = expression.match(expressionArgument.pattern);
      return dependencies ? result.concat(dependencies) : result;
    }, []);
  }

  private createFieldExpressionFunction(expression: string): DynamicFormExpressionFunction {
    return new Function(...DynamicFormFieldExpression.args, `return ${ expression };`);
  }
}
