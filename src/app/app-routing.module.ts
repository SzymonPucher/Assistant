import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './layout/budget/budget.component';
import { BudgetExpensesComponent } from './layout/budget/expenses/budget-expenses.component';
import { BudgetExpensesAddComponent } from './layout/budget/expenses/add/budget-expenses-add.component';
import { SettlementComponent } from './layout/budget/expenses/settlement/settlement.component';
import { BudgetIncomesComponent } from './layout/budget/incomes/budget-incomes.component';
import { BudgetIncomesAddComponent } from './layout/budget/incomes/add/budget-incomes-add.component';
import { BudgetLoansComponent } from './layout/budget/loans/budget-loans.component';
import { BudgetLoansAddComponent } from './layout/budget/loans/add/budget-loans-add.component';
import { BudgetInnertransferComponent } from './layout/budget/innertransfer/budget-innertransfer.component';
import { BudgetInnertransferAddComponent } from './layout/budget/innertransfer/add/budget-innertransfer-add.component';
import { JournalComponent } from './layout/journal/journal.component';
import { JournalEventComponent } from './layout/journal/event/journal-event.component';
import { JournalPomodoroComponent } from './layout/journal/pomodoro/journal-pomodoro.component';
import { VendorTypeComponent } from './layout/budget/mgmt/vendor-type/vendor-type.component';
import { VendorComponent } from './layout/budget/mgmt/vendor/vendor.component';
import { BudgetExpensesBankStatementHistoryComponent } from './layout/budget/expenses/bank-statement-history/budget-expenses-bank-statement-history.component';
import { BudgetBillsAddComponent } from './layout/budget/bills/budget-bills-add/budget-bills-add.component';
import { BudgetBillsComponent } from './layout/budget/bills/budget-bills.component';


const routes: Routes = [
  { path: 'budget', component: BudgetComponent },
  { path: 'budget/bills', component: BudgetBillsComponent },
  { path: 'budget/bills/add', component: BudgetBillsAddComponent },
  { path: 'budget/expenses', component: BudgetExpensesComponent },
  { path: 'budget/expenses/add', component: BudgetExpensesAddComponent },
  { path: 'budget/expenses/settlement', component: SettlementComponent },
  { path: 'budget/expenses/bank', component: BudgetExpensesBankStatementHistoryComponent },
  { path: 'budget/incomes', component: BudgetIncomesComponent },
  { path: 'budget/incomes/add', component: BudgetIncomesAddComponent },
  { path: 'budget/loans', component: BudgetLoansComponent },
  { path: 'budget/loans/add', component: BudgetLoansAddComponent },
  { path: 'budget/innertransfers', component: BudgetInnertransferComponent },
  { path: 'budget/innertransfers/add', component: BudgetInnertransferAddComponent },
  { path: 'budget/mgmt/vendors', component: VendorComponent },
  { path: 'budget/mgmt/vendors/types', component: VendorTypeComponent },

  { path: 'journal', component: JournalComponent },
  { path: 'journal/event', component: JournalEventComponent },
  { path: 'journal/pomodoro', component: JournalPomodoroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
