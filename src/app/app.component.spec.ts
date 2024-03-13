import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastNotification } from './interfaces/ToastNotification';

// Pipe Translate mocked
@Pipe({name: 'translate'})
class PipeTranslateMock {
  transform(): string {
    return '';
  }
}

// Formula Operator component mocked
@Component({
  selector: 'formula-operator',
  template: '',
  styleUrls: [],
})
export class FormulaOperatorComponentMock {
  @Input() public operatorType: string = 'SUBTRACTION';
  @Input() public leftSide: any = {
    type: "NUMBER",
    value: 4
  };
  @Input() public rightSide: any = {
    type: "PI",
    value: "PI"
  };
}


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
         }),
      ],
      declarations: [
        AppComponent,
        PipeTranslateMock,
        FormulaOperatorComponentMock
      ],
      providers: [
        TranslateService 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('handleFormulaService method sets a value to formula', () => {
    const element = '5';
    component['handleFormula'].setSingleElement(element);
    component['handleFormulaService'];
    component['handleFormula'].getSingleElement().subscribe(elem => {
      expect(elem).toBe('5');
      expect(component.formulaBuiltArray.length).toBe(1);
      expect(component.formula).toBe('5');
    });
  });

  it('handleToastService method sets a notification toast', () => {
    const toast: ToastNotification = {
      type: 'success',
      message: 'Success message'
    };
    component['handleToast'].setToastMessage(toast);
    component['handleToastService'];
    component['handleToast'].getToastMessage().subscribe(elem => {
      expect(elem.type).toBe('success');
      expect(elem.message).toBe('Success message');
      expect(component.toastNotification).toEqual({type: 'success', message: 'Success message'});
    });
  });

  it('handleToastService method sets an empty notification toast if type = success', fakeAsync(() => {
    const toast: ToastNotification = {
      type: 'success',
      message: 'Success message'
    };
    component['handleToast'].setToastMessage(toast);
    component['handleToastService'];
    tick(3000);
    expect(component.toastNotification).toEqual({});
  }));

  it('addOperatorComponent method create an instance of the render component', () => {
    const jsonOperation: any = {
      type: "SUBTRACTION",
      left: {
        type: "NUMBER",
        value: 4
      },
      right: {
        type: "PI",
        value: "PI"
      }
    };

    const componentFactory = component['componentFactoryResolver'].resolveComponentFactory(FormulaOperatorComponentMock);
    const componentRef = componentFactory.create(component.dynamicComponentContainer?.injector);
    component.addOperatorComponent(jsonOperation.type, jsonOperation.left, jsonOperation.right);
    expect(componentRef.instance.operatorType).toBe('SUBTRACTION');
    expect(componentRef.instance.leftSide.type).toBe('NUMBER');
    expect(componentRef.instance.rightSide.value).toBe('PI');
    expect(component.dynamicComponentContainer.insert(componentRef.hostView)).toBeTruthy();
  });

  it('updateAstView method returns values for variables', () => {
    const _formula = '1 + 2';
    const _tree = {
      type: "ADDITION",
      left: {
        type: "NUMBER",
        value: 1
      },
      right: {
        type: "NUMBER",
        value: 2
      }
    };
    component.formula = _formula;
    component.updateAstView();
    expect(component.isConverterEnabled).toBeFalse();
    expect(component['handleFormula'].setFormula).toBeTruthy();
    expect(component.dynamicComponentContainer.clear).toBeTruthy();
    expect(component.syntaxTree).toEqual({
      type: "ADDITION",
      left: {
        type: "NUMBER",
        value: 1
      },
      right: {
        type: "NUMBER",
        value: 2
      }
    });
    expect(component.syntaxTreeJson).toEqual(JSON.stringify(_tree, null, 2))
  });

  it('convertAstToFormula method call the addOperatorComponent function', () => {
    const _tree = {
      type: "ADDITION",
      left: {
        type: "NUMBER",
        value: 1
      },
      right: {
        type: "NUMBER",
        value: 2
      }
    };
    component.syntaxTree = _tree;
    component.addOperatorComponent(_tree.type, _tree.left, _tree.right);
    const spy = spyOn(component, 'addOperatorComponent');
    component.convertAstToFormula();
    expect(component.isConverterEnabled).toBeTrue();
    expect(spy).toHaveBeenCalledWith('ADDITION', {type: 'NUMBER', value: 1}, {type: 'NUMBER', value: 2});
  });

  it('closeToast method returns an empty object', () => {
    component.closeToast();
    expect(component.toastNotification).toEqual({});
  });

  it('selectLanguage method returns a language selected by user', () => {
    const selection1 = 'uk';
    component.translate.use('en');
    component.selectLanguage(selection1);
    expect(component.selectedLanguage).toBe('uk');
    expect(component.translate.use).toBeTruthy();

    const selection2 = 'spain';
    component.translate.use('es');
    component.selectLanguage(selection2);
    expect(component.selectedLanguage).toBe('spain');
    expect(component.translate.use).toBeTruthy();
  });

  it('showSuggestions method displays the suggestions dialog', () => {
    component.showSuggestions();
    expect(component.isDialogShown).toBeTrue();
  });

  it('ngOnDestroy submits a subject as undefined', () => {
    const spy = spyOn(component['destroy$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(undefined);
  });
});


