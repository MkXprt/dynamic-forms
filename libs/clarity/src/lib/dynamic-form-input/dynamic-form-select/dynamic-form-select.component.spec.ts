import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrSelectContainer } from '@clr/angular';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormSelect,
  DynamicFormValidationService} from '@dynamic-forms/core';
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
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        },
        DynamicFormValidationService
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
            { value: 'value2', label: 'label2' },
            {
              label: 'group1',
              items: [
                { value: 'value3', label: 'label3' },
                { value: 'value4', label: 'label4' }
              ]
            },
            {
              label: 'group2',
              items: [
                { value: 'value5', label: 'label5' }
              ]
            }
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
    const optionGroupDebugElements = selectDebugElement.queryAll(By.css('optgroup'));

    const selectElement = <HTMLSelectElement>selectDebugElement.nativeElement;
    const optionElements = <HTMLOptionElement[]>optionDebugElements.map(elem => elem.nativeElement);
    const optionGroups = optionGroupDebugElements.map(elem => {
      return {
        groupElement: <HTMLOptGroupElement>elem.nativeElement,
        optionElements: <HTMLOptionElement[]>elem.queryAll(By.css('option')).map(e => e.nativeElement)
      };
    });

    expect(selectElement).toBeDefined();
    expect(selectElement.id).toBe(component.id);
    expect(optionElements.length).toBe(6);
    expect(optionElements[0].disabled).toBe(true);
    expect(optionElements[0].hidden).toBe(true);
    expect(optionElements[0].innerText).toBe('placeholder');
    expect(optionElements[1].value).toBe('1: value1');
    expect(optionElements[1].innerText).toBe('label1');
    expect(optionElements[2].value).toBe('2: value2');
    expect(optionElements[2].innerText).toBe('label2');

    expect(optionGroups.length).toBe(2);
    expect(optionGroups[0].groupElement.label).toBe('group1');
    expect(optionGroups[0].optionElements.length).toBe(2);
    expect(optionGroups[0].optionElements[0]).toBe(optionElements[3]);
    expect(optionGroups[0].optionElements[0].value).toBe('3: value3');
    expect(optionGroups[0].optionElements[0].innerText).toBe('label3');
    expect(optionGroups[0].optionElements[1]).toBe(optionElements[4]);
    expect(optionGroups[0].optionElements[1].value).toBe('4: value4');
    expect(optionGroups[0].optionElements[1].innerText).toBe('label4');
    expect(optionGroups[1].groupElement.label).toBe('group2');
    expect(optionGroups[1].optionElements.length).toBe(1);
    expect(optionGroups[1].optionElements[0]).toBe(optionElements[5]);
    expect(optionGroups[1].optionElements[0].value).toBe('5: value5');
    expect(optionGroups[1].optionElements[0].innerText).toBe('label5');
  });
});