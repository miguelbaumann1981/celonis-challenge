import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';

@Component({
  selector: 'toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit {

  @Input() public toastNotification: ToastNotification = {
    message: 'Toast message',
    type: 'error'
  };
  @Output() public closeToastEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }



}
