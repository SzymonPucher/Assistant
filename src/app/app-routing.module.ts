import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget/budget.component'
import { BudgetExpensesComponent } from './budget/budget-expenses/budget-expenses.component';
import { BudgetExpensesAddComponent } from './budget/budget-expenses/budget-expenses-add/budget-expenses-add.component';
import { BudgetIncomesComponent } from './budget/budget-incomes/budget-incomes.component';
import { BudgetIncomesAddComponent } from './budget/budget-incomes/budget-incomes-add/budget-incomes-add.component';
import { BudgetLoansComponent } from './budget/budget-loans/budget-loans.component';
import { BudgetLoansAddComponent } from './budget/budget-loans/budget-loans-add/budget-loans-add.component';
import { BudgetInnertransferComponent } from './budget/budget-innertransfer/budget-innertransfer.component';
import { BudgetInnertransferAddComponent } from './budget/budget-innertransfer/budget-innertransfer-add/budget-innertransfer-add.component';
import { JournalComponent } from './journal/journal.component'


const routes: Routes = [
  { path: 'budget', component: BudgetComponent },
  { path: 'budget/expenses', component: BudgetExpensesComponent },
  { path: 'budget/expenses/add', component: BudgetExpensesAddComponent },
  { path: 'budget/incomes', component: BudgetIncomesComponent },
  { path: 'budget/incomes/add', component: BudgetIncomesAddComponent },
  { path: 'budget/loans', component: BudgetLoansComponent },
  { path: 'budget/loans/add', component: BudgetLoansAddComponent },
  { path: 'budget/innertransfers', component: BudgetInnertransferComponent },
  { path: 'budget/innertransfers/add', component: BudgetInnertransferAddComponent },
  { path: 'journal', component: JournalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
