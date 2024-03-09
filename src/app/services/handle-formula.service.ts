import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleFormulaService {

  private readonly formula$ = new BehaviorSubject<string>('');
  private readonly singleElement$ = new BehaviorSubject<string>('');

  constructor() { }

  setFormula(formula: string): void {
    this.formula$.next(formula);
  }

  getFormula(): Observable<string> {
    return this.formula$.asObservable();
  }

  setSingleElement(element: string): void {
    this.singleElement$.next(element);
  }

  getSingleElement(): Observable<string> {
    return this.singleElement$.asObservable();
  }

}
