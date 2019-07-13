import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLoansAddComponent } from './budget-loans-add.component';

describe('BudgetLoansAddComponent', () => {
  let component: BudgetLoansAddComponent;
  let fixture: ComponentFixture<BudgetLoansAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetLoansAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetLoansAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
