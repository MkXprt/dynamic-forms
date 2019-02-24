import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { DynamicFormsMaterialModule } from '@dynamic-forms/material';
import { ExampleResolver } from '../example.resolver';
import { MaterialExamplesComponent } from './material-examples.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild([
      {
        path: ':templateId',
        component: MaterialExamplesComponent,
        resolve: {
          template: ExampleResolver
        }
      }
    ]),
    DynamicFormsMaterialModule.forRoot()
  ],
  declarations: [
    MaterialExamplesComponent
  ]
})
export class MaterialExamplesModule {}