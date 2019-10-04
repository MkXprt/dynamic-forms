import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrInputContainer } from '@clr/angular';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormTextbox,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox.component';
import { DynamicFormTextboxModule } from './dynamic-form-textbox.module';

describe('DynamicFormTextboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormTextboxComponent>;
  let component: DynamicFormTextboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormTextbox>;
  let formControl: DynamicFormControl<DynamicFormTextbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextboxModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        },
        DynamicFormValidationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormTextboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormTextbox>>{ key: 'key', template: { input: {} } };
    formControl = new DynamicFormControl<DynamicFormTextbox>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const inputWrapperDebugElement = fixture.debugElement.query(By.directive(ClrInputContainer));
    const inputDebugElement = inputWrapperDebugElement.query(By.css('input'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement).toBeDefined();
    expect(inputElement.id).toBe(component.id);
    expect(inputElement.type).toBe('text');
  });

  it('sets dynamic form control to readonly', () => {
    const inputWrapperDebugElement = fixture.debugElement.query(By.directive(ClrInputContainer));
    const inputDebugElement = inputWrapperDebugElement.query(By.css('input'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});