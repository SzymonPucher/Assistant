import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetBillsAddBulkComponent } from './budget-bills-add-bulk.component';

describe('BudgetBillsAddBulkComponent', () => {
  let component: BudgetBillsAddBulkComponent;
  let fixture: ComponentFixture<BudgetBillsAddBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetBillsAddBulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetBillsAddBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
