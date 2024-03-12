import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SelectItem } from 'src/app/interfaces/SelectItem';
import { OperatorsService } from 'src/app/services/operators.service';


@Component({
  selector: 'formula-element',
  templateUrl: './formula-element.component.html',
  styleUrls: ['./formula-element.component.scss']
})
export class FormulaElementComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() public id: number = 0;
  @Input() public type: string | undefined = '';
  @Input() public value: any;
  @Input() public arguments: any[] = [];

  @Output() public submitElementEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public submitSymbolEvent: EventEmitter<string> = new EventEmitter<string>();

  public functionId: number = Math.floor(Math.random() * 1000);
  public valueTypes: SelectItem[] = [];
  public selectedValueType: SelectItem[] = [];

  constructor(private operatorsService: OperatorsService) { }

  ngOnInit(): void {
    this.getValueTypesService();
  }

  /*
    ** Method to get the value types from service
  */
  private getValueTypesService(): void {
    this.operatorsService.getTypeValues().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.valueTypes = response.data;
      this.valueTypes.map((value) => {
        if (this.type === value.key) {
          this.selectedValueType.push(value);
        }
      });
    });
  }

  /*
    ** Method to submit the element changed
  */
  public onChange(event: any) {
    this.submitElementEvent.emit(event.target.value);
  }

  /*
    ** Method to submit the symbol changed
  */
  public onSelect(event: any): void {
    this.submitSymbolEvent.emit(event.node.label);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

}
