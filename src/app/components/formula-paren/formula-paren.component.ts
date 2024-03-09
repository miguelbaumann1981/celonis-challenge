import { Component, Input, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'formula-paren',
  templateUrl: './formula-paren.component.html',
  styleUrls: ['./formula-paren.component.scss'],
  providers: [MessageService]
})
export class FormulaParenComponent implements OnInit {

  @Input() public type: string = '';
  @Input() public expression: any;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(this.expression);
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
}

onReject() {
  this.messageService.clear('c');
}

}
