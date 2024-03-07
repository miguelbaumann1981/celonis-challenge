import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  
  @Input() message: string = '';

  constructor() { }
  ngOnInit(): void {
   console.log('dynamic component');
  }


  

}
