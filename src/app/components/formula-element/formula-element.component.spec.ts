import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaElementComponent } from './formula-element.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OperatorsService } from 'src/app/services/operators.service';
import { of } from 'rxjs';

const dataService: any = {
  data: [
      {
          key: "NUMBER",
          label: "Integer"
        },
        {
          key: "E",
          label: "Logarithm"
        },
        {
          key: "PI",
          label: "PI"
        },
        {
          key: "VARIABLE",
          label: "Variable"
        }
  ]
};

const OperatorsServiceMock =  {
  getTypeValues: () => of(dataService)
}

describe('FormulaElementComponent', () => {
  let component: FormulaElementComponent;
  let fixture: ComponentFixture<FormulaElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ 
        FormulaElementComponent 
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
    fixture = TestBed.createComponent(FormulaElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('getValueTypesService method subscribes a variable', () => {
    component['getValueTypesService'];
    expect(component.valueTypes.length).toBe(4);
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

  it('onChange method submits a value', () => {
    const event: any = {
      target: {
        value: '4'
      }
    };
    const spy = spyOn(component.submitElementEvent, 'emit');
    component.onChange(event);
    expect(spy).toHaveBeenCalledWith('4');
  });
});
