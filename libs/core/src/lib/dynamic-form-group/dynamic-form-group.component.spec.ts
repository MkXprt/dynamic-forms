import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

describe('DynamicFormGroupComponent', () => {
  let fixture: ComponentFixture<DynamicFormGroupComponent>;
  let component: DynamicFormGroupComponent;
  let form: DynamicForm;
  let formGroup: DynamicFormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        DynamicFormGroupComponent,
        DynamicFormFieldComponent,
        DynamicFormValidationComponent
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ module: 'core' })
        }
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(DynamicFormGroupComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    formGroup = new DynamicFormGroup(form, form, <DynamicFormGroupTemplate>{
      key: 'key',
      fields: []
    });
    component.field = formGroup;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
    expect(component.template).toBeDefined();
    expect(component.control).toBeDefined();
    expect(component.fields).toEqual([]);
  });

  it('creates component template', () => {
    const formGroupDebugElement = fixture.debugElement.query(By.css('.dynamic-form-group'));
    const formGroupLabelDebugElement = formGroupDebugElement.query(By.css('.dynamic-form-group-label'));
    const formGroupValidationDebugElement = formGroupDebugElement.query(By.css('dynamic-form-validation'));
    const formGroupElement = <HTMLElement>formGroupDebugElement.nativeElement;
    const formGroupLabelElement = <HTMLElement>formGroupLabelDebugElement.nativeElement;
    const formGroupValidationComponent = <DynamicFormValidationComponent>formGroupValidationDebugElement.componentInstance;

    expect(formGroupElement).toBeDefined();
    expect(formGroupLabelElement).toBeDefined();
    expect(formGroupValidationComponent.errors).toBe(component.control.errors);
  });

  it('sets dynamic form group to hidden', () => {
    const formGroupDebugElement = fixture.debugElement.query(By.css('.dynamic-form-group'));
    const formGroupElement = <HTMLElement>formGroupDebugElement.nativeElement;

    expect(formGroupElement.className).not.toContain('hidden');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formGroupElement.className).toContain('hidden');
  });
});
