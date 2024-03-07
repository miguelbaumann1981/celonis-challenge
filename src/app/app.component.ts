import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';

// @ts-ignore
import * as Parser from './parser/formula-parser.js';
import { DynamicComponent } from './components/dynamic/dynamic.component';
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

  formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
  visualizerOutput: string = "";
  syntaxTree: any;
  syntaxTreeJson: string = "";

 

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver, 
  ) {}

  addComponent(message: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    const componentRef = componentFactory.create(this.dynamicComponentContainer.injector);
    componentRef.instance.message = message;
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
    console.log('creating ast view...');
    this.syntaxTree = parse(this.formula);
    console.log('The ast is: ', this.syntaxTree);
    this.syntaxTreeJson = JSON.stringify(this.syntaxTree, null, 2);
    
    /////////


    // this.evaluateIfOperator(this.syntaxTree);

    const propertyNames = Object.entries(this.syntaxTree);
    console.log(propertyNames);

    propertyNames.forEach(elem => {
      console.log(elem);
      elem.forEach(newAr => {
        console.log(newAr);
      });
    });




    //////////////
    if (this.syntaxTree?.left) {
      this.addComponent(this.syntaxTree?.left.type);
    }

  }

  convertAstToFormula() {
    console.log('converting ast to string...');
    this.visualizerOutput = "TO BE IMPLEMENTED";
  }

}
