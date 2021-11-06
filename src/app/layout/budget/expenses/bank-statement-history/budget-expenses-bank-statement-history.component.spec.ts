import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpensesBankStatementHistoryComponent } from './budget-expenses-bank-statement-history.component';

describe('BudgetExpensesBankStatementHistoryComponent', () => {
  let component: BudgetExpensesBankStatementHistoryComponent;
  let fixture: ComponentFixture<BudgetExpensesBankStatementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetExpensesBankStatementHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetExpensesBankStatementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
