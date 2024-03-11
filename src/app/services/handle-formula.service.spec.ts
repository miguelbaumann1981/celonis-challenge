import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HandleFormulaService } from './handle-formula.service';


describe('HandleFormulaService', () => {
  let service: HandleFormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HandleFormulaService
      ],
      schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA, 
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(HandleFormulaService);
  });

  it('setFormula method stores a variable', () => {
    const formula: string = '1 + 2';
    const spy = spyOn(service['formula$'], 'next');
    service.setFormula(formula);
    expect(spy).toHaveBeenCalledOnceWith('1 + 2');
  });

  it('getFormula method returns a value', () => {
    const formula: string = '3 * 2';
    service.setFormula(formula);
    service.getFormula().subscribe(response => {
      expect(response).toBe('3 * 2');
    });
  });

  it('setSingleElement method stores a variable', () => {
    const element: string = '45';
    const spy = spyOn(service['singleElement$'], 'next');
    service.setSingleElement(element);
    expect(spy).toHaveBeenCalledOnceWith('45');
  });

  it('getSingleElement method returns a value', () => {
    const element: string = '17';
    service.setSingleElement(element);
    service.getSingleElement().subscribe(response => {
      expect(response).toBe('17');
    });
  });
});
