import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormCheckbox, DynamicFormConfig, DynamicFormConfigService,
  DynamicFormControl, DynamicFormControlDefinition, DynamicFormDefinition,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';
import { DynamicFormCheckboxModule } from './dynamic-form-checkbox.module';

describe('DynamicFormCheckboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormCheckboxComponent>;
  let component: DynamicFormCheckboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormCheckbox>;
  let formControl: DynamicFormControl<DynamicFormCheckbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormCheckboxModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService('test', [{ library: 'test' }])
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormCheckboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormCheckbox>>{ key: 'key', template: { label: 'label' } };
    formControl = new DynamicFormControl<DynamicFormCheckbox>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const checkDebugElement = fixture.debugElement.query(By.css('div.form-check'));
    const inputDebugElement = checkDebugElement.query(By.css('input.form-check-input'));
    const labelDebugElement = checkDebugElement.query(By.css('label.form-check-label'));
    const checkElement = <HTMLDivElement>checkDebugElement.nativeElement;
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;

    expect(checkElement).toBeDefined();
    expect(inputElement).toBeDefined();
    expect(inputElement.id).toBe(component.id);
    expect(inputElement.type).toBe('checkbox');
    expect(labelElement).toBeDefined();
    expect(labelElement.htmlFor).toBe(component.id);
    expect(labelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const checkDebugElement = fixture.debugElement.query(By.css('div.form-check'));
    const inputDebugElement = checkDebugElement.query(By.css('input.form-check-input'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
