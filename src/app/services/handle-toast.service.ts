import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleToastService {
  private readonly toastMessage$ = new BehaviorSubject<string>('');
  
  constructor() { }

  setToastMessage(message: string): void {
    this.toastMessage$.next(message);
  }

  getToastMessage(): Observable<string> {
    return this.toastMessage$.asObservable();
  }
}
