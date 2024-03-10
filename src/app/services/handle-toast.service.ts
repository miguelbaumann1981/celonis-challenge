import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastNotification } from '../interfaces/ToastNotification';

@Injectable({
  providedIn: 'root'
})
export class HandleToastService {
  private readonly toastMessage$ = new BehaviorSubject<ToastNotification>({});
  
  constructor() { }

  setToastMessage(toast: ToastNotification): void {
    this.toastMessage$.next(toast);
  }

  getToastMessage(): Observable<ToastNotification> {
    return this.toastMessage$.asObservable();
  }
}
