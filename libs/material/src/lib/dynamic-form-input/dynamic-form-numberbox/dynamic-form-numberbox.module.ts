import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { MatDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const matDynamicFormNumberboxConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'numberbox', component: MatDynamicFormNumberboxComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormConfigModule.forChild(matDynamicFormNumberboxConfig)
  ],
  declarations: [
    MatDynamicFormNumberboxComponent
  ],
  entryComponents: [
    MatDynamicFormNumberboxComponent
  ]
})
export class MatDynamicFormNumberboxModule {}
