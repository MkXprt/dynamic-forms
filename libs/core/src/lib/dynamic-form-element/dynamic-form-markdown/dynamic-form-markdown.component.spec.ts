import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormMarkdownDefinition } from './dynamic-form-markdown-definition';
import { DynamicFormMarkdownTemplate } from './dynamic-form-markdown-template';
import { DynamicFormMarkdownComponent } from './dynamic-form-markdown.component';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

describe('DynamicFormMarkdownComponent', () => {
  let service: jasmine.SpyObj<DynamicFormMarkdownService>;
  let fixture: ComponentFixture<DynamicFormMarkdownComponent>;
  let component: DynamicFormMarkdownComponent;
  let element: DynamicFormElement<DynamicFormMarkdownTemplate, DynamicFormMarkdownDefinition>;

  beforeEach(async(() => {
    service = jasmine.createSpyObj<DynamicFormMarkdownService>('service', [ 'compile', 'compileFromSource' ]);

    TestBed.configureTestingModule({
      declarations: [
        DynamicFormMarkdownComponent
      ],
      providers: [
        {
          provide: DynamicFormMarkdownService,
          useValue: service
        }
      ]
    });

    fixture = TestBed.createComponent(DynamicFormMarkdownComponent);
    component = fixture.componentInstance;

    const template = <DynamicFormMarkdownTemplate>{};
    const definition = <DynamicFormMarkdownDefinition>{ type: 'element', template };
    element = new DynamicFormElement<DynamicFormMarkdownTemplate, DynamicFormMarkdownDefinition>(definition);
    component.element = element;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.element).toBe(element);
  });

  it('creates component template', () => {
    service.compile.and.returnValue(undefined);

    const formMarkdownDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-markdown'));
    const formMarkdownElement = <HTMLElement>formMarkdownDebugElement.nativeElement;

    expect(formMarkdownElement).toBeDefined();
    expect(formMarkdownElement.innerHTML).toBe('');
    expect(service.compile).toHaveBeenCalledWith(undefined, undefined);
  });

  it('creates component template for markdown', () => {
    service.compile.and.returnValue('<h1>Title</h1>');

    component.element.template.markdown = '# Title';

    fixture.detectChanges();

    const formMarkdownDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-markdown'));
    const formMarkdownElement = <HTMLElement>formMarkdownDebugElement.nativeElement;

    expect(formMarkdownElement).toBeDefined();
    expect(formMarkdownElement.innerHTML).toBe('<h1>Title</h1>');
    expect(service.compile).toHaveBeenCalledWith('# Title', undefined);
  });

  it('creates component template for markdown source', async(() => {
    service.compileFromSource.and.returnValue(of('<h1>Title</h1>'));

    component.element.template.source = '/assets/README.md';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formMarkdownDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-markdown'));
      const formMarkdownElement = <HTMLElement>formMarkdownDebugElement.nativeElement;

      expect(formMarkdownElement).toBeDefined();
      expect(formMarkdownElement.innerHTML).toBe('<h1>Title</h1>');
      expect(service.compileFromSource).toHaveBeenCalledWith('/assets/README.md', undefined);
    });
  }));
});
