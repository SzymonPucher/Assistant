import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpensesSimpleaddComponent } from './budget-expenses-simpleadd.component';

describe('BudgetExpensesSimpleaddComponent', () => {
  let component: BudgetExpensesSimpleaddComponent;
  let fixture: ComponentFixture<BudgetExpensesSimpleaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetExpensesSimpleaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetExpensesSimpleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
