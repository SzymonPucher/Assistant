import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends BaseService {

  constructor(public db: AngularFireDatabase) {
    super(db);
  }

  public getExpenses() {
    return this.getList('budget/expenses');
  }

  public getIncomes() {
    return this.getList('budget/incomes');
  }

  public getInnerTransfers() {
    return this.getList('budget/innertransfers');
  }

  public getLoans() {
    return this.getList('budget/loans');
  }

  public addExpense(data: any) {
    return this.addOneDoc(data, 'budget/expenses');
  }

  public updateExpense(data: any, update_key: string) {
    const path = 'budget/expenses/' + update_key
    return this.updateOneDoc(data, path);
  }
}
