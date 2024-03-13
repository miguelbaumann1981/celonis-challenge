import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OperatorsService } from './operators.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

const operatorsData: any = {
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

const typeValuesData: any = {
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

describe('OperatorsService', () => {
  let service: OperatorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        OperatorsService
      ],
      schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA, 
        NO_ERRORS_SCHEMA
      ]
    });
  });
  
  beforeEach(() => {
    service = TestBed.inject(OperatorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('getOperators method returns a list of operators and does a get method', () => {
    service.getOperators().subscribe((resp: any) => {
      expect(resp).toEqual(operatorsData);
    });

    const req = httpMock.expectOne('assets/data/operators.json');
    expect(req.request.method).toBe('GET');
    req.flush(operatorsData);
  });

  it('getTypeValues method returns a list of value types and does a get method', () => {
    service.getTypeValues().subscribe((resp: any) => {
      expect(resp).toEqual(typeValuesData);
    });

    const req = httpMock.expectOne('assets/data/type-values.json');
    expect(req.request.method).toBe('GET');
    req.flush(typeValuesData);
  });
});
