import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpensesAddComponent } from './budget-expenses-add.component';

describe('BudgetExpensesAddComponent', () => {
  let component: BudgetExpensesAddComponent;
  let fixture: ComponentFixture<BudgetExpensesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetExpensesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetExpensesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
