import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OperatorsService } from 'src/app/services/operators.service';


@Component({
  selector: 'formula-element',
  templateUrl: './formula-element.component.html',
  styleUrls: ['./formula-element.component.scss']
})
export class FormulaElementComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();

  @Input() public id: number = 0;
  @Input() public type: string = '';
  @Input() public value: any;
  @Input() public arguments: any[] = [];
  @Input() public formula: string = '';

  @Output() submitElementEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitSymbolEvent: EventEmitter<string> = new EventEmitter<string>();

  public operation: any[] = [];
  public elementEdited: any;
  public elemValue: any;
  // public id: number = Math.floor(Math.random() * 100);
  public valueTypes: any[] = [];
  public selectedValueType: any[] = [];

  constructor( private operatorsService: OperatorsService ) { }

  ngOnInit(): void {
    this.operatorsService.getTypeValues().pipe(takeUntil(this.destroy$)).subscribe((files) => {
      this.valueTypes = files.data;
      this.valueTypes.map((value) => {
        if (this.type === value.key) {
          this.selectedValueType.push(value);
        }
      })
    });
  }

  public onChange(event: any) {
    this.submitElementEvent.emit(event.target.value);
  }

  onSelect(event: any): void {
    this.submitSymbolEvent.emit(event.node.label);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

}
