import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaParenComponent } from './formula-paren.component';

describe('FormulaParenComponent', () => {
  let component: FormulaParenComponent;
  let fixture: ComponentFixture<FormulaParenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaParenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaParenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
