import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaSymbolComponent } from './formula-symbol.component';

describe('FormulaSymbolComponent', () => {
  let component: FormulaSymbolComponent;
  let fixture: ComponentFixture<FormulaSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaSymbolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
