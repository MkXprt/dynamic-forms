import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export interface DynamicFormElementDefinition<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate
> {
  id?: string;
  key?: string;
  type?: string;
  template?: Template;
  elements?: DynamicFormElementDefinition[];
}
