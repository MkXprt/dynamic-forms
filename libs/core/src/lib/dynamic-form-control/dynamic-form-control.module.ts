import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { dynamicFormControlFactory } from './dynamic-form-control-factory';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

export const dynamicFormControlType: DynamicFormFieldType = {
  type: 'control',
  factory: dynamicFormControlFactory,
  component: DynamicFormControlComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormControlType)
  ],
  declarations: [
    DynamicFormControlComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormControlComponent
  ]
})
export class DynamicFormControlModule {}
