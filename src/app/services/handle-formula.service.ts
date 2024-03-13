import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleFormulaService {

  private readonly formula$ = new BehaviorSubject<string>('');
  private readonly singleElement$ = new BehaviorSubject<string>('');

  constructor() { }

  /*
    ** Method to set a new formula and store in a behaviour subject
  */
  setFormula(formula: string): void {
    this.formula$.next(formula);
  }

  /*
    ** Method to get the formula as observable
  */
  getFormula(): Observable<string> {
    return this.formula$.asObservable();
  }

  /*
    ** Method to set a new element and store in a behaviour subject
  */
  setSingleElement(element: string): void {
    this.singleElement$.next(element);
  }

  /*
    ** Method to get the element as observable
  */
  getSingleElement(): Observable<string> {
    return this.singleElement$.asObservable();
  }

}
