import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { FormulaOperatorComponent } from './formula-operator.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';

@Pipe({name: 'translate'})
class PipeTranslateMock {
  transform(): string {
    return '';
  }
}

const jsonOperation1: any = {
  type: "DIVISION",
  left: {
    type: "PAREN",
    expression: {
      type: "SUBTRACTION",
      left: {
        type: "NUMBER",
        value: 4
      },
      right: {
        type: "NUMBER",
        value: 3
      }
    }
  },
  right: {
    type: "PAREN",
    expression: {
      type: "MULTIPLICATION",
      left: {
        type: "NUMBER",
        value: 2
      },
      right: {
        type: "VARIABLE",
        name: "$a"
      }
    }
  }
};

const jsonOperation2: any = {
  type: "SUBTRACTION",
  left: {
    type: "NUMBER",
    value: 4
  },
  right: {
    type: "NUMBER",
    value: 3
  }
};
  

describe('FormulaOperatorComponent', () => {
  let component: FormulaOperatorComponent;
  let fixture: ComponentFixture<FormulaOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
         }),
      ],
      declarations: [ 
        FormulaOperatorComponent,
        PipeTranslateMock
      ],
      providers: [
        TranslateService 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit inits the formula block', () => {
    const spy1 = spyOn(component, 'assignmentValuesLeftBlock').and.callFake(() => null);
    const spy2 = spyOn(component, 'assignmentValuesRightBlock').and.callFake(() => null);
    component.leftSingleElement.value = jsonOperation2.left.value;
    component.rightSingleElement.value = jsonOperation2.right.value;
    component.operatorType = jsonOperation2.type;
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(component.formulaBlockArray.push('4 SUBTRACTION 3')).toBeTruthy();
  });


  it('assignmentValuesLeftBlock method assigns a value to the left expression', () => {
    component.leftSide = jsonOperation2.left;
    component.assignmentValuesLeftBlock();
    expect(component.leftExpression).toEqual(jsonOperation2.left.expression);
    expect(component.leftSingleElement.type).toBe('NUMBER');
    expect(component.leftSingleElement.value).toBe(4);
    expect(component.leftSingleElement.arguments).toEqual([]);

    component.leftSide = jsonOperation1.left;
    component.assignmentValuesLeftBlock();
    expect(component.leftExpression).toEqual(jsonOperation1.left.expression);
  });

  it('assignmentValuesRightBlock method assigns values to the right single element', () => {
    component.rightSide = jsonOperation2.right;
    component.assignmentValuesRightBlock();
    expect(component.rightSingleElement.type).toBe('NUMBER');
    expect(component.rightSingleElement.value).toBe(3);
    expect(component.rightSingleElement.arguments).toEqual([]);

    component.rightSide = jsonOperation1.right;
    component.assignmentValuesRightBlock();
    expect(component.rightExpression).toEqual(jsonOperation1.right.expression);
  });
  
  it('mapValueByType method returns a type NUMBER value', () => {
    const jsonOperation: any = {
      type: "SUBTRACTION",
      left: {
        type: "NUMBER",
        value: 4
      },
      right: {
        type: "PI",
        value: 3.14
      }
    };
    component.leftSide = jsonOperation.left;
    component.mapValueByType(jsonOperation.left, jsonOperation.left.type);
    expect(component.leftSide.value).toBe(4);
  });

  it('mapValueByType method returns a type PI value', () => {
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
    component.rightSide = jsonOperation.right;
    component.mapValueByType(jsonOperation.right, jsonOperation.right.type);
    expect(component.rightSide.value).toBe("PI");
  });

  it('mapValueByType method returns a type FUNCTION value', () => {
    const jsonOperation: any = {
      "type": "DIVISION",
      "left": {
        "type": "FUNCTION",
        "name": "SQR",
        "arguments": [
          {
            "type": "ADDITION",
            "left": {
              "type": "NUMBER",
              "value": 1
            },
            "right": {
              "type": "NUMBER",
              "value": 8
            }
          }
        ]
      },
      "right": {
        "type": "PAREN",
        "expression": {
          "type": "ADDITION",
          "left": {
            "type": "NUMBER",
            "value": 2
          },
          "right": {
            "type": "NUMBER",
            "value": 9
          }
        }
      }
    };
    component.leftSide = jsonOperation.left;
    component.mapValueByType(jsonOperation.left, jsonOperation.left.type);
    expect(component.leftSide.name).toBe('SQR');
  });

  it('mapValueByType method returns a type VARIABLE value', () => {
    const jsonOperation: any = {
      "type": "ADDITION",
      "left": {
        "type": "VARIABLE",
        "name": "$a"
      },
      "right": {
        "type": "NUMBER",
        "value": 9
      }
    };
    component.leftSide = jsonOperation.left;
    component.mapValueByType(jsonOperation.left, jsonOperation.left.type);
    expect(component.leftSide.name).toBe("$a");
  });

  it('onElementEvent submits a single element and toast notification', () => {
    const element: string = '5';
    const toast: ToastNotification = {
      type: 'error',
      message: 'Error message'
    };
    component['handleFormula'].setSingleElement(element);
    component['handleToast'].setToastMessage(toast);
    component.onElementEvent(element);
    expect(component).toBeTruthy();
  });
  
  it('onSymbolEvent submits a symbol and toast notification', () => {
    const symbol: string = '+';
    const toast: ToastNotification = {
      type: 'success',
      message: 'Success message'
    };
    component['handleFormula'].setSingleElement(symbol);
    component['handleToast'].setToastMessage(toast);
    component.onSymbolEvent(symbol);
    expect(component).toBeTruthy();
  });

});
