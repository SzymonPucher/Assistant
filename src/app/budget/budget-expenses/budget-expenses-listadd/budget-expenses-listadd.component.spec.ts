import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpensesListaddComponent } from './budget-expenses-listadd.component';

describe('BudgetExpensesListaddComponent', () => {
  let component: BudgetExpensesListaddComponent;
  let fixture: ComponentFixture<BudgetExpensesListaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetExpensesListaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetExpensesListaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
