import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaOperatorComponent } from './formula-operator.component';

describe('FormulaOperatorComponent', () => {
  let component: FormulaOperatorComponent;
  let fixture: ComponentFixture<FormulaOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
