import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormTextarea,
  DynamicFormValidationService} from '@dynamic-forms/core';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { DynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('DynamicFormTextareaComponent', () => {
  let fixture: ComponentFixture<DynamicFormTextareaComponent>;
  let component: DynamicFormTextareaComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormTextarea>;
  let formControl: DynamicFormControl<DynamicFormTextarea>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextareaModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        },
        DynamicFormValidationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormTextareaComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormTextarea>>{ key: 'key', template: { input: {} } };
    formControl = new DynamicFormControl<DynamicFormTextarea>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const textareaDebugElement = fixture.debugElement.query(By.css('textarea.form-control'));
    const textareaElement = <HTMLTextAreaElement>textareaDebugElement.nativeElement;

    expect(textareaElement).toBeDefined();
    expect(textareaElement.id).toBe(component.id);
  });

  it('sets dynamic form control to readonly', () => {
    const textareaDebugElement = fixture.debugElement.query(By.css('textarea.form-control'));
    const textareaElement = <HTMLTextAreaElement>textareaDebugElement.nativeElement;

    expect(textareaElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(textareaElement.readOnly).toBe(true);
  });
});
