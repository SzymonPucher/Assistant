import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Expense } from 'src/app/models/core/expense';
import { Income } from 'src/app/models/core/income';
import { InnerTransfer } from 'src/app/models/core/innertransfer';
import { Loan } from 'src/app/models/core/loan';
import { of } from 'rxjs';
import { environment } from "../../../environments/environment";
import { expensesListStub, incomesListStub, innerTransfersListStub, loansListStub } from "src/app/services/api/stubs/budget.stubs"

@Injectable({
  providedIn: 'root'
})
export class BudgetApiService extends BaseApiService {

  constructor(public db: AngularFireDatabase) {
    super(db);
    let prefix = 'assistant/users/simon/data/budget';
  }

  // get

  public getExpenses() {
    if (!environment.production) {
      return of(expensesListStub);
    }
    return this.getList('budget/expenses').pipe(map(data => data.map(item => new Expense(item))));
  }

  public getExpensesWithKeys() {
    if (!environment.production) {
      return of(expensesListStub);
    }
    return this.getListWithKeys('budget/expenses').pipe(map(data => data.map(item => new Expense(item.payload.val(), item.payload.key))));;
  }

  public getIncomes() {
    if (!environment.production) {
      return of(incomesListStub);
    }
    return this.getList('budget/incomes').pipe(map(data => data.map(item => new Income(item))));;
  }

  public getIncomesWithKeys() {
    if (!environment.production) {
      return of(incomesListStub);
    }
    return this.getListWithKeys('budget/incomes').pipe(map(data => data.map(item => new Income(item.payload.val(), item.payload.key))));
  }

  public getInnerTransfers() {
    if (!environment.production) {
      return of(innerTransfersListStub);
    }
    return this.getList('budget/innertransfers').pipe(map(data => data.map(item => new InnerTransfer(item))));;
  }

  public getInnerTransfersWithKeys() {
    if (!environment.production) {
      return of(innerTransfersListStub);
    }
    return this.getListWithKeys('budget/innertransfers').pipe(map(data => data.map(item => new InnerTransfer(item.payload.val(), item.payload.key))));;
  }

  public getLoans() {
    if (!environment.production) {
      return of(loansListStub);
    }
    return this.getList('budget/loans').pipe(map(data => data.map(item => new Loan(item))));;
  }

  public getLoansWithKeys() {
    if (!environment.production) {
      return of(loansListStub);
    }
    return this.getListWithKeys('budget/loans').pipe(map(data => data.map(item => new Loan(item.payload.val(), item.payload.key))));;
  }

  // add

  public addExpense(data: any) {
    if (!environment.production) {
      return null;
    }
    this.addOneDoc(data, 'budget/expenses');
  }

  public addIncome(data: any) {
    if (!environment.production) {
      return null;
    }
    this.addOneDoc(data, 'budget/incomes');
  }

  public addInnerTransfer(data: any) {
    if (!environment.production) {
      return null;
    }
    this.addOneDoc(data, 'budget/innertransfers');
  }

  public addLoan(data: any) {
    if (!environment.production) {
      return null;
    }
    this.addOneDoc(data, 'budget/loans');
  }

  //update

  public updateExpense(data: any, update_key: string) {
    if (!environment.production) {
      return null;
    }
    const path = 'budget/expenses/' + update_key
    return this.updateOneDoc(data, path);
  }

  public updateIncome(data: any, update_key: string) {
    if (!environment.production) {
      return null;
    }
    const path = 'budget/incomes/' + update_key
    return this.updateOneDoc(data, path);
  }

  public updateInnerTransfer(data: any, update_key: string) {
    if (!environment.production) {
      return null;
    }
    const path = 'budget/innertransfers/' + update_key
    return this.updateOneDoc(data, path);
  }

  public updateLoan(data: any, update_key: string) {
    if (!environment.production) {
      return null;
    }
    const path = 'budget/loans/' + update_key
    return this.updateOneDoc(data, path);
  }

  // remove

  public removeExpense(key: string) {
    if (!environment.production) {
      return null;
    }
    return this.removeOneDoc('budget/expenses/' + key);
  }

  public removeIncome(key: string) {
    if (!environment.production) {
      return null;
    }
    return this.removeOneDoc('budget/incomes/' + key);
  }

  public removeInnerTransfer(key: string) {
    if (!environment.production) {
      return null;
    }
    return this.removeOneDoc('budget/innertransfers/' + key);
  }

  public removeLoan(key: string) {
    if (!environment.production) {
      return null;
    }
    return this.removeOneDoc('budget/loans/' + key);
  }

}
