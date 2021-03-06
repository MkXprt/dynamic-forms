import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormExampleComponent } from '../dynamic-form-example.component';

@Component({
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html',
  styleUrls: ['./material-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialExamplesComponent extends DynamicFormExampleComponent {
  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }
}
