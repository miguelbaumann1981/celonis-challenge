import { Component } from '@angular/core';

@Component({
  selector: 'alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.scss']
})
export class AlertNotificationComponent {

  public showExamples: boolean = false;

  constructor() { }

  toggleExamples(): void {
    this.showExamples = !this.showExamples;
  }

}
