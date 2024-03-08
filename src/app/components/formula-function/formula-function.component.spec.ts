import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaFunctionComponent } from './formula-function.component';

describe('FormulaFunctionComponent', () => {
  let component: FormulaFunctionComponent;
  let fixture: ComponentFixture<FormulaFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
