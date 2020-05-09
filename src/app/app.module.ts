import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { MenuComponent } from "./menu/menu.component";

import { BudgetComponent } from "./budget/budget.component";
import { BudgetExpensesComponent } from "./budget/budget-expenses/budget-expenses.component";
import { BudgetExpensesAddComponent } from "./budget/budget-expenses/budget-expenses-add/budget-expenses-add.component";
import { BudgetIncomesComponent } from "./budget/budget-incomes/budget-incomes.component";
import { BudgetIncomesAddComponent } from "./budget/budget-incomes/budget-incomes-add/budget-incomes-add.component";
import { BudgetLoansComponent } from "./budget/budget-loans/budget-loans.component";
import { BudgetLoansAddComponent } from "./budget/budget-loans/budget-loans-add/budget-loans-add.component";
import { BudgetInnertransferComponent } from "./budget/budget-innertransfer/budget-innertransfer.component";
import { BudgetInnertransferAddComponent } from "./budget/budget-innertransfer/budget-innertransfer-add/budget-innertransfer-add.component";

import { JournalComponent } from "./journal/journal.component";
import { JournalEventComponent } from "./journal/journal-event/journal-event.component";
import { JournalPomodoroComponent } from "./journal/journal-pomodoro/journal-pomodoro.component";

import { MultivalueListComponent } from "./shared/multivalue-list/multivalue-list.component";
import { UniversalSimpleFormComponent } from "./shared/universal-simple-form/universal-simple-form.component";

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
