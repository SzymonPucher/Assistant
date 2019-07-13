import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetInnertransferComponent } from './budget-innertransfer.component';

describe('BudgetInnertransferComponent', () => {
  let component: BudgetInnertransferComponent;
  let fixture: ComponentFixture<BudgetInnertransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetInnertransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetInnertransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
