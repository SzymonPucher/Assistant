import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetExpensesComponent } from './budget/budget-expenses/budget-expenses.component';
import { BudgetExpensesAddComponent } from './budget/budget-expenses/budget-expenses-add/budget-expenses-add.component';
import { BudgetIncomesComponent } from './budget/budget-incomes/budget-incomes.component';
import { BudgetIncomesAddComponent } from './budget/budget-incomes/budget-incomes-add/budget-incomes-add.component';
import { BudgetLoansComponent } from './budget/budget-loans/budget-loans.component';
import { BudgetLoansAddComponent } from './budget/budget-loans/budget-loans-add/budget-loans-add.component';
import { BudgetInnertransferComponent } from './budget/budget-innertransfer/budget-innertransfer.component';
import { BudgetInnertransferAddComponent } from './budget/budget-innertransfer/budget-innertransfer-add/budget-innertransfer-add.component';
import { MenuComponent } from './menu/menu.component';
import { JournalComponent } from './journal/journal.component';
import { SuggestionInputComponent } from './common/suggestion-input/suggestion-input.component';
import { MultivalueListComponent } from './common/multivalue-list/multivalue-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BudgetComponent,
    BudgetExpensesComponent,
    BudgetExpensesAddComponent,
    BudgetIncomesComponent,
    BudgetIncomesAddComponent,
    BudgetLoansComponent,
    BudgetLoansAddComponent,
    BudgetInnertransferComponent,
    BudgetInnertransferAddComponent,
    JournalComponent,
    SuggestionInputComponent,
    MultivalueListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
