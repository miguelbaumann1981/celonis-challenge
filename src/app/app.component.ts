import { Component } from '@angular/core';

// @ts-ignore
import * as Parser from './parser/formula-parser.js';
const parse = Parser.parse;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
  visualizerOutput: string = "";
  syntaxTree: any;
  syntaxTreeJson: string = "";

  updateAstView() {
    console.log('creating ast view...');
    this.syntaxTree = parse(this.formula);
    console.log('The ast is: ', this.syntaxTree);
    this.syntaxTreeJson = JSON.stringify(this.syntaxTree, null, 2);
  }

  convertAstToFormula() {
    console.log('converting ast to string...');
    this.visualizerOutput = "TO BE IMPLEMENTED";
  }

}
