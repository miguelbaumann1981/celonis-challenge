import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'formula-paren',
  templateUrl: './formula-paren.component.html',
  styleUrls: ['./formula-paren.component.scss']
})
export class FormulaParenComponent implements OnInit {

  @Input() public type: string = '';
  @Input() public expression: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.expression);
  }

}
