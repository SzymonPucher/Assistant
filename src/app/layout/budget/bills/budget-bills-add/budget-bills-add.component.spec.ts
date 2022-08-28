import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetBillsAddComponent } from './budget-bills-add.component';

describe('BudgetBillsAddComponent', () => {
  let component: BudgetBillsAddComponent;
  let fixture: ComponentFixture<BudgetBillsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetBillsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetBillsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
