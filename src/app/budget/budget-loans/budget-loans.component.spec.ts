import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLoansComponent } from './budget-loans.component';

describe('BudgetLoansComponent', () => {
  let component: BudgetLoansComponent;
  let fixture: ComponentFixture<BudgetLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
