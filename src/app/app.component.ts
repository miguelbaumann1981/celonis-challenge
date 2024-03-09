import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

// @ts-ignore
import * as Parser from './parser/formula-parser.js';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { FormulaOperatorComponent } from './components/formula-operator/formula-operator.component';
import { HandleFormulaService } from './services/handle-formula.service';
import { Subject, takeUntil } from 'rxjs';
const parse = Parser.parse;

type operator = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
  dynamicComponentContainer!: ViewContainerRef;

  // formula: string = "SQRT (SQR($b) - 4 * $a)";
  // formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
  formula: string = "(4 - 3) / (2 * $a)";
  // formula: string = "(4 - SQR($b - 8)) / (2 * $a)";
  visualizerOutput: string = "";
  syntaxTree: any;
  syntaxTreeJson: string = "";
  public showDynamicComponent: boolean = false;
  public formulaBuiltArray: string[] = [];
 

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private handleFormula: HandleFormulaService 
  ) {}

  ngOnInit(): void {
    this.handleFormula.getSingleElement().pipe(takeUntil(this.destroy$)).subscribe(element => {
      if (element) {
        this.formula = '';
        this.formulaBuiltArray.push(element);
        // console.log('Elements en app', this.formulaBuiltArray);
        // const transform = this.formulaBuiltArray.toString().replace(',', ' ');
        // console.log(transform);
        // this.formula = transform;
      }
    });
  }

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

  onSubmit(): void {
    this.formula = '';
    console.log('Elements en app', this.formulaBuiltArray);
      const transform = this.formulaBuiltArray.toString();
      console.log(transform);
    this.formula = transform.replace(/,/g, ' ');
  }

}
