import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { FormulaOperatorComponent } from './formula-operator.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

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
  "type": "SUBTRACTION",
  "left": {
    "type": "NUMBER",
    "value": 4
  },
  "right": {
    "type": "NUMBER",
    "value": 3
  }
};
  

fdescribe('FormulaOperatorComponent', () => {
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
  });
  
  
  
  
  it('ngOnDestroy submits a subject as undefined', () => {
    const spy = spyOn(component['destroy$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(undefined);
  });
});
