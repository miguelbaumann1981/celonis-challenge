import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastNotification } from '../interfaces/ToastNotification';

@Injectable({
  providedIn: 'root'
})
export class HandleToastService {
  private readonly toastMessage$ = new BehaviorSubject<ToastNotification>({});
  
  constructor() { }

  /*
    ** Method to set a new toast notification and store in a behaviour subject
  */
  setToastMessage(toast: ToastNotification): void {
    this.toastMessage$.next(toast);
  }

  /*
    ** Method to get the toast notification as observable
  */
  getToastMessage(): Observable<ToastNotification> {
    return this.toastMessage$.asObservable();
  }
}
