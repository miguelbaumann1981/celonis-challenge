import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SelectItem } from 'src/app/interfaces/SelectItem';
import { OperatorsService } from 'src/app/services/operators.service';

@Component({
  selector: 'formula-symbol',
  templateUrl: './formula-symbol.component.html',
  styleUrls: ['./formula-symbol.component.scss']
})
export class FormulaSymbolComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() public operatorType: string = '';
  @Output() public submitSymbolEvent: EventEmitter<string> = new EventEmitter<string>();

  public symbols: SelectItem[] = [];
  public selectedSymbol: SelectItem[] = [];

  constructor(private operatorsService: OperatorsService) { }

  ngOnInit(): void {
    this.getOperatorsService();
  }

  /*
    ** Method to get the value types from service
  */
  private getOperatorsService(): void {
    this.operatorsService.getOperators().pipe(takeUntil(this.destroy$)).subscribe((files) => {
      this.symbols = files.data;
      this.symbols.map((symbol) => {
        if (this.operatorType === symbol.key) {
          this.selectedSymbol.push(symbol);
        }
      });
    });
  }


  onSelect(event: any): void {
    this.submitSymbolEvent.emit(event.node.label);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

}
