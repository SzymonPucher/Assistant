import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetInnertransferAddComponent } from './budget-innertransfer-add.component';

describe('BudgetInnertransferAddComponent', () => {
  let component: BudgetInnertransferAddComponent;
  let fixture: ComponentFixture<BudgetInnertransferAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetInnertransferAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetInnertransferAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
