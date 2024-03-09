import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HandleFormulaService } from 'src/app/services/handle-formula.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'formula-operator',
  templateUrl: './formula-operator.component.html',
  styleUrls: ['./formula-operator.component.scss']
})
export class FormulaOperatorComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() public operatorType: string = '';
  @Input() public leftSide: any;
  @Input() public rightSide: any;
  @Input() public formula: string = '';

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
  dynamicComponentContainer!: ViewContainerRef;

  public leftExpression: any;
  public rightExpression: any;
  public leftSingleElement: any = {
    type: '',
    value: '',
    arguments: []
  };
  public rightSingleElement: any = {
    type: '',
    value: '',
    arguments: []
  };
  public editedValue: any;
  public formulaBlock: string = '';
  public formulaBlockArray: string[] = [];
  public elementId: number = Math.floor(Math.random() * 100);
  public formulaBuiltArray: string[] = [];

  constructor( 
    private handleFormula: HandleFormulaService,
   ) {
     
     }

  ngOnInit(): void {

    this.handleFormula.getFormula().pipe(takeUntil(this.destroy$)).subscribe(formula => {
      console.log('Formula en element', formula);
    });
    
    if (this.leftSide?.expression) {
      this.leftExpression = this.leftSide?.expression;
    } else {
      this.leftSingleElement = {
        type: this.leftSide?.type,
        value: this.leftSide?.type === 'NUMBER' || this.leftSide?.type === 'PI' ? this.leftSide?.value : this.leftSide?.name,
        arguments: this.leftSide?.type === 'FUNCTION' ? this.leftSide?.arguments : [] 
      };
    }

    if (this.rightSide?.expression) {
      this.rightExpression = this.rightSide?.expression;
    } else {
      this.rightSingleElement = {
        type: this.rightSide?.type,
        value: this.rightSide?.type === 'NUMBER' || this.rightSide?.type === 'PI' ? this.rightSide?.value : this.rightSide?.name,
        arguments: this.rightSide?.type === 'FUNCTION' ? this.rightSide?.arguments : []
      };
    }

    this.formulaBlock = this.leftSingleElement.value + ' ' + this.operatorType + ' ' + this.rightSingleElement.value;
    this.formulaBlockArray.push(this.formulaBlock);
    // console.log('formulaBlockArray', this.formulaBlockArray);

  }

  public onElementEvent(element: string): void {
    console.log('element: ', element);
    this.handleFormula.setSingleElement(element);
  }

  onSelect(event: any): void {
    console.log(event);
  }

  onSymbolEvent(symbol: string): void {
    console.log('symbol: ', symbol);
    this.handleFormula.setSingleElement(symbol);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    
  }

}
