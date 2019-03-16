import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DropdownInput } from './dropdown-input';

@Component({
  selector: 'mat-dynamic-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent extends DynamicFormInputComponent<DropdownInput> {

}
