import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrSelectContainer } from '@clr/angular';
import { DynamicForm, DynamicFormControl, DynamicFormControlDefinition, DynamicFormDefinition,
  DynamicFormSelect } from '@dynamic-forms/core';
import { DynamicFormSelectComponent } from './dynamic-form-select.component';
import { DynamicFormSelectModule } from './dynamic-form-select.module';

describe('DynamicFormSelectComponent', () => {
  let fixture: ComponentFixture<DynamicFormSelectComponent>;
  let component: DynamicFormSelectComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormSelect>;
  let formControl: DynamicFormControl<DynamicFormSelect>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormSelectModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormSelectComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormSelect>>{
      key: 'key',
      template: {
        input: {
          placeholder: 'placeholder',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' }
          ]
        }
      }
    };
    formControl = new DynamicFormControl<DynamicFormSelect>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const selectWrapperDebugElement = fixture.debugElement.query(By.directive(ClrSelectContainer));
    const selectDebugElement = selectWrapperDebugElement.query(By.css('select'));
    const optionDebugElements = selectDebugElement.queryAll(By.css('option'));
    const selectElement = <HTMLSelectElement>selectDebugElement.nativeElement;
    const optionElements = <HTMLOptionElement[]>optionDebugElements.map(elem => elem.nativeElement);

    expect(selectElement).toBeDefined();
    expect(selectElement.id).toBe(component.id);
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].disabled).toBe(true);
    expect(optionElements[0].hidden).toBe(true);
    expect(optionElements[0].innerText).toBe('placeholder');
    expect(optionElements[1].value).toBe('value1');
    expect(optionElements[1].innerText).toBe('label1');
    expect(optionElements[2].value).toBe('value2');
    expect(optionElements[2].innerText).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const selectWrapperDebugElement = fixture.debugElement.query(By.directive(ClrSelectContainer));
    const selectDebugElement = selectWrapperDebugElement.query(By.css('select'));
    const selectElement = <HTMLSelectElement>selectDebugElement.nativeElement;

    expect(selectElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(selectElement.className).toContain('readonly');
  });
});
