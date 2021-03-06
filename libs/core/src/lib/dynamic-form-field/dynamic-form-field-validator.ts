import { ValidationErrors } from '@angular/forms';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

export type DynamicFormFieldValidatorFn<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl
> = (control: Control) => ValidationErrors | null;

export type DynamicFormFieldValidatorFactory<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl
> = (parameters?: any, message?: string, key?: string) => DynamicFormFieldValidatorFn<Control>;

export abstract class DynamicFormFieldValidator<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Field extends DynamicFormField<Control> = DynamicFormField<Control>
> {
  private _key: string;
  private _field: Field;
  private _factory: DynamicFormFieldValidatorFactory<Control>;

  private _definition: DynamicFormFieldValidatorDefinition;
  private _message: string;

  private _enabled: boolean;
  private _parameters: any;
  private _validatorFn: DynamicFormFieldValidatorFn<Control>;

  constructor(key: string, field: Field, factory: DynamicFormFieldValidatorFactory<Control>) {
    this._key = key;
    this._field = field;
    this._factory = factory;
    this._definition = field.definition.validators && field.definition.validators[key];
    this._message = this._definition && this._definition.message;
    this.init();
  }

  get key(): string { return this._key; }
  get field(): Field { return this._field; }
  get factory(): DynamicFormFieldValidatorFactory<Control> { return this._factory; }

  get definition(): DynamicFormFieldValidatorDefinition { return this._definition; }
  get message(): any { return this._message; }

  get enabled(): boolean { return this._enabled; }
  get parameters(): any { return this._parameters; }
  get validatorFn(): DynamicFormFieldValidatorFn<Control> { return this._validatorFn; }

  checkChanges(): boolean {
    const enabled = this.getEnabled();
    const parameters = this.getParameters();
    if (this._enabled !== enabled || this._parameters !== parameters) {
      this._enabled = enabled;
      this._parameters = parameters;
      this._validatorFn = this.getValidatorFn();
      return true;
    }
    return false;
  }

  protected abstract getParameters(): any;

  private init(): void {
    this._enabled = this.getEnabled();
    this._parameters = this.getParameters();
    this._validatorFn = this.getValidatorFn();
  }

  private getEnabled(): boolean {
    return this._field.template.validation[this._key];
  }

  private getValidatorFn(): DynamicFormFieldValidatorFn<Control> {
    return this._enabled ? this._factory(this._parameters, this._message, this._key) : undefined;
  }
}
