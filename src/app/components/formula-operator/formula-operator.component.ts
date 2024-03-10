import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HandleFormulaService } from 'src/app/services/handle-formula.service';
import { Subject, takeUntil } from 'rxjs';
import { SideBlockOperator } from 'src/app/interfaces/SideBlockOperator';
import { HandleToastService } from 'src/app/services/handle-toast.service';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';
import { TranslatePipe } from '@ngx-translate/core';
import { Type } from 'src/app/enums/Operators';

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

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
  dynamicComponentContainer!: ViewContainerRef;

  public leftExpression: any;
  public rightExpression: any;
  public leftSingleElement: SideBlockOperator = {
    type: '',
    value: '',
    arguments: []
  };
  public rightSingleElement: SideBlockOperator = {
    type: '',
    value: '',
    arguments: []
  };
  public formulaBlockArray: string[] = [];
  public parenLeftId: number = Math.floor(Math.random() * 1000);
  public parenRightId: number = Math.floor(Math.random() * 1000);
  public formulaBuiltArray: string[] = [];

  constructor(
    private handleFormula: HandleFormulaService,
    private handleToast: HandleToastService,
    private translatePipe: TranslatePipe
  ) {}

  ngOnInit(): void {
    this.assignmentValuesLeftBlock();
    this.assignmentValuesRightBlock();

    const block = this.leftSingleElement.value + ' ' + this.operatorType + ' ' + this.rightSingleElement.value;
    this.formulaBlockArray.push(block);
  }

  /*
    ** Method to assing values to the left block
  */
  public assignmentValuesLeftBlock(): void {
    if (this.leftSide?.expression) {
      this.leftExpression = this.leftSide?.expression;
    } else {
      this.leftSingleElement = {
        type: this.leftSide?.type,
        value: this.mapValueByType(this.leftSide, this.leftSide?.type),
        arguments: this.leftSide?.type === 'FUNCTION' ? this.leftSide?.arguments : [] 
      };
    }
  }

  /*
    ** Method to assing values to the right block
  */
  public assignmentValuesRightBlock(): void {
    if (this.rightSide?.expression) {
      this.rightExpression = this.rightSide?.expression;
    } else {
      this.rightSingleElement = {
        type: this.rightSide?.type,
        value: this.mapValueByType(this.rightSide, this.rightSide?.type),
        arguments: this.rightSide?.type === 'FUNCTION' ? this.rightSide?.arguments : []
      };
    }
  }

  /*
    ** Method to map the value by type
  */
  public mapValueByType(side: any, type: string): any {
    switch (type) {
      case Type.Number:
        return side?.value;
      case Type.Pi:
        return Type.Pi;
      case Type.Function:
        return side?.name;
      case Type.Variable:
        return side?.name;
      case Type.Paren:
        return side?.name;
    }
  }

  /*
    ** Method to submit the element value
  */
  public onElementEvent(element: string): void {
    this.handleFormula.setSingleElement(element);

    const toast: ToastNotification = {
      type: 'success',
      message: this.translatePipe.transform('operator.toast_message_success')
    }
    this.handleToast.setToastMessage(toast);
  }

  /*
    ** Method to submit the symbol value
  */
  public onSymbolEvent(symbol: string): void {
    this.handleFormula.setSingleElement(symbol);

    const toast: ToastNotification = {
      type: 'success',
      message: this.translatePipe.transform('operator.toast_message_success')
    }
    this.handleToast.setToastMessage(toast);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

}
