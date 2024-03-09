import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'formula-function',
  templateUrl: './formula-function.component.html',
  styleUrls: ['./formula-function.component.scss']
})
export class FormulaFunctionComponent implements OnInit {

  @Input() public type: string = '';
  @Input() public functionName: string = '';
  @Input() public arguments: any[] = [];

  public argsFunction: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.argsFunction = this.arguments;
    console.log(this.arguments);
  }

}
