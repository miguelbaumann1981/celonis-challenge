import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaSymbolComponent } from './formula-symbol.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OperatorsService } from 'src/app/services/operators.service';
import { of } from 'rxjs';


const dataService: any = {
  data: [
      {
          key: "ADDITION",
          label: "+"
        },
        {
          key: "SUBTRACTION",
          label: "-"
        },
        {
          key: "MULTIPLICATION",
          label: "*"
        },
        {
          key: "DIVISION",
          label: "/"
        },
        {
          key: "POWER",
          label: "^"
        },
        {
          key: "NEGATION",
          label: "!"
        }
  ]
};
const OperatorsServiceMock =  {
  getOperators: () => of(dataService)
}

describe('FormulaSymbolComponent', () => {
  let component: FormulaSymbolComponent;
  let fixture: ComponentFixture<FormulaSymbolComponent>;
  let service: OperatorsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ 
        FormulaSymbolComponent 
      ],
      providers: [
        {
          provide: OperatorsService,
          useValue: OperatorsServiceMock
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('getOperatorsService method subscribes a variable', () => {
    component['getOperatorsService'];
    expect(component.symbols.length).toBe(6);
  });

  it('onSelect method submits a label', () => {
    const event: any = {
      node: {
        label: '+'
      }
    };
    const spy = spyOn(component.submitSymbolEvent, 'emit');
    component.onSelect(event);
    expect(spy).toHaveBeenCalledWith('+');
  });

});
