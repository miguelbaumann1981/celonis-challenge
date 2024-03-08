import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';

// @ts-ignore
import * as Parser from './parser/formula-parser.js';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { FormulaOperatorComponent } from './components/formula-operator/formula-operator.component';
import { HandleFormulaService } from './services/handle-formula.service';
const parse = Parser.parse;

type operator = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
  dynamicComponentContainer!: ViewContainerRef;

  // formula: string = "SQRT (SQR($b) - 4 * $a)";
  // formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
  // formula: string = "(4 - 3) / (2 * $a)";
  formula: string = "(4 - SQR($b - 8)) / (2 * $a)";
  visualizerOutput: string = "";
  syntaxTree: any;
  syntaxTreeJson: string = "";
  public showDynamicComponent: boolean = false;

 

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private handleFormula: HandleFormulaService 
  ) {}

  addComponent(message: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    const componentRef = componentFactory.create(this.dynamicComponentContainer.injector);
    componentRef.instance.message = message;
    this.dynamicComponentContainer.insert(componentRef.hostView);
  }

  addOperatorComponent(operatorType: string, left: any, right: any, formula: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormulaOperatorComponent);
    const componentRef = componentFactory.create(this.dynamicComponentContainer?.injector);
    componentRef.instance.operatorType = operatorType;
    componentRef.instance.leftSide = left;
    componentRef.instance.rightSide = right;
    componentRef.instance.formula = formula;
    this.dynamicComponentContainer.insert(componentRef.hostView);
  }

  evaluateIfOperator(formula: any): void {
    if (
      formula?.type === 'MULTIPLICATION' || 
      formula?.type === 'DIVISION' || 
      formula?.type === 'ADDITION' ||
      formula?.type === 'SUBTRACTION'
    ) {
      console.log(formula?.left);
      console.log(formula?.right);
      this.evaluateIfParentesis(formula?.left);
      this.evaluateIfParentesis(formula?.right);
    } else {
      console.log('no hay tipo');
    }
  }

  evaluateIfParentesis(formula2: any): void {
    if (formula2?.type === 'PAREN') {
      console.log(formula2?.expression);
      this.evaluateIfOperator(formula2?.expression);
      this.evaluateIfFunction(formula2?.expression?.type)
    } else {
      console.log('no hay PAREN');
    }
  }

  evaluateIfFunction(formula3: any) {
    if (formula3?.type === 'FUNCTION') {
      console.log(formula3?.arguments[0]);
      this.evaluateIfOperator(formula3?.arguments[0]);
    } else {
      console.log('no hay FUNCTION');
    }
  }

  updateAstView() {
    console.log('creating ast view...', this.formula);
    this.handleFormula.setFormula(this.formula);
    this.dynamicComponentContainer.clear();

    this.syntaxTree = parse(this.formula);
    console.log('The ast is: ', this.syntaxTree);
    this.syntaxTreeJson = JSON.stringify(this.syntaxTree, null, 2);
  }

  convertAstToFormula() {
    console.log('converting ast to string...');
    // this.visualizerOutput = "TO BE IMPLEMENTED";
    if (this.syntaxTree) {
      this.addOperatorComponent(
        this.syntaxTree?.type, 
        this.syntaxTree?.left, 
        this.syntaxTree?.right,
        this.formula);
    }
  }

}
