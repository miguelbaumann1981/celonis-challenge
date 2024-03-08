import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HandleFormulaService } from 'src/app/services/handle-formula.service';
import { Subject, takeUntil } from 'rxjs';
import { OperatorsService } from 'src/app/services/operators.service';

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
  public formulaOperator: string = '';
  public elementId: number = Math.floor(Math.random() * 100);
  public nodes: any[] = [];
  selectedNodes2: any[] = [];

  constructor( 
    private handleFormula: HandleFormulaService,
    private operatorsService: OperatorsService ) {
     
     }

  ngOnInit(): void {
    this.operatorsService.getOperators().subscribe((files) => {
      console.log(files.data);
      this.nodes = files.data;
      this.selectedNodes2 = [this.nodes[0]];
    });
    // console.log(this.leftSide);
    // console.log(this.rightSide);

    // console.log(this.leftSide?.expression);
    // console.log(this.rightSide?.expression);

    this.handleFormula.getFormula().pipe(takeUntil(this.destroy$)).subscribe(formula => {
      console.log('Formula en element', formula);
    })
    
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

    this.formulaOperator = this.leftSingleElement.value + ' ' + this.operatorType + ' ' + this.rightSingleElement.value;
    console.log(this.formulaOperator);

  }

  public onElementEvent(event: any): void {
    console.log('editedValue', event);
  }

  onSelect(event: any): void {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    
  }

}
