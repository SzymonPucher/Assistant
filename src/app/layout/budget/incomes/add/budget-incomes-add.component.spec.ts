import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetIncomesAddComponent } from './budget-incomes-add.component';

describe('BudgetIncomesAddComponent', () => {
  let component: BudgetIncomesAddComponent;
  let fixture: ComponentFixture<BudgetIncomesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetIncomesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetIncomesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
