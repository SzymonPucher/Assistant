import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetIncomesComponent } from './budget-incomes.component';

describe('BudgetIncomesComponent', () => {
  let component: BudgetIncomesComponent;
  let fixture: ComponentFixture<BudgetIncomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetIncomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
