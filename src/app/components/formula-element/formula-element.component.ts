import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';


@Component({
  selector: 'formula-element',
  templateUrl: './formula-element.component.html',
  styleUrls: ['./formula-element.component.scss']
})
export class FormulaElementComponent implements OnInit {
  

  @Input() public id: number = 0;
  @Input() public type: string = '';
  @Input() public value: any;
  @Input() public arguments: any[] = [];
  @Input() public formula: string = '';

  @Output() elementEvent: EventEmitter<any> = new EventEmitter<any>();

  public operation: any[] = [];
  public elementEdited: any;
  public elemValue: any;
  // public id: number = Math.floor(Math.random() * 100);

  constructor( ) { }

  ngOnInit(): void {
    // console.log(this.type, this.value);
    // console.log(this.arguments);
    // console.log('id??', this.value, this.id);
  }

  public onChange(event: any) {
    console.log(event.target.value);
    // this.elementEdited = event.target.value;
    // this.elementEvent.emit({id : this.id, elem: this.elementEdited});
  }



}
