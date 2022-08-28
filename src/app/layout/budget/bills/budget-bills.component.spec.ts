import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetBillsComponent } from './budget-bills.component';

describe('BudgetBillsComponent', () => {
  let component: BudgetBillsComponent;
  let fixture: ComponentFixture<BudgetBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
