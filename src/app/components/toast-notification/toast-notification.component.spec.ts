import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastNotificationComponent } from './toast-notification.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';

describe('ToastNotificationComponent', () => {
  let component: ToastNotificationComponent;
  let fixture: ComponentFixture<ToastNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastNotificationComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('toastNotification Input sets a default value', () => {
    const toast: ToastNotification = {
      type: 'error',
      message: 'test message'
    }
    component.toastNotification.message = 'test message';
    expect(component.toastNotification).toEqual(toast);
  });

  it('closeToastEvent Output emits an event', () => {
    const spy = spyOn(component.closeToastEvent, 'emit');
    expect(spy).toBeTruthy();
  });
});
