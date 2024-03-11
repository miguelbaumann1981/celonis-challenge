import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HandleToastService } from './handle-toast.service';
import { ToastNotification } from '../interfaces/ToastNotification';

const toast: ToastNotification = {
  type: 'error',
  message: 'Message'
};

describe('HandleToastService', () => {
  let service: HandleToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HandleToastService
      ],
      schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA, 
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(HandleToastService);
  });

  it('setToastMessage method stores a variable', () => {
    const spy = spyOn(service['toastMessage$'], 'next');
    service.setToastMessage(toast);
    expect(spy).toHaveBeenCalledOnceWith({type: 'error', message: 'Message'});
  });

  it('getToastMessage method returns a value', () => {
    service.setToastMessage(toast);
    service.getToastMessage().subscribe(response => {
      expect(response.type).toBe('error');
      expect(response.message).toBe('Message');
    });
  });
});
