import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatMenuModule } from "@angular/material";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { MenuComponent } from './layout/menu/menu.component';
import { BudgetComponent } from './layout/budget/budget.component';
import { BudgetExpensesComponent } from './layout/budget/expenses/budget-expenses.component';
import { BudgetExpensesAddComponent } from './layout/budget/expenses/add/budget-expenses-add.component';
import { BudgetIncomesComponent } from './layout/budget/incomes/budget-incomes.component';
import { BudgetIncomesAddComponent } from './layout/budget/incomes/add/budget-incomes-add.component';
import { BudgetLoansComponent } from './layout/budget/loans/budget-loans.component';
import { BudgetLoansAddComponent } from './layout/budget/loans/add/budget-loans-add.component';
import { BudgetInnertransferComponent } from './layout/budget/innertransfer/budget-innertransfer.component';
import { BudgetInnertransferAddComponent } from './layout/budget/innertransfer/add/budget-innertransfer-add.component';
import { JournalComponent } from './layout/journal/journal.component';
import { JournalEventComponent } from './layout/journal/event/journal-event.component';
import { JournalPomodoroComponent } from './layout/journal/pomodoro/journal-pomodoro.component';
import { MultivalueListComponent } from './layout/shared/multivalue-list/multivalue-list.component';
import { UniversalSimpleFormComponent } from './layout/shared/universal-simple-form/universal-simple-form.component';
import { SettlementComponent } from './layout/budget/expenses/settlement/settlement.component';
import { AddFieldToFormComponent } from './layout/shared/add-field-to-form/add-field-to-form.component';

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
    JournalEventComponent,
    JournalPomodoroComponent,

    MultivalueListComponent,
    UniversalSimpleFormComponent,
    SettlementComponent,
    AddFieldToFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,

    FormsModule,
    ReactiveFormsModule,

    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,

    BrowserAnimationsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
