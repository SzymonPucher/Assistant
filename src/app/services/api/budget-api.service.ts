import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Expense } from 'src/app/models/core/expense';
import { Income } from 'src/app/models/core/income';
import { InnerTransfer } from 'src/app/models/core/innertransfer';
import { Loan } from 'src/app/models/core/loan';


@Injectable({
  providedIn: 'root'
})
export class BudgetApiService extends BaseApiService {

  constructor(public db: AngularFireDatabase) {
    super(db);
  }

  // get

  public getExpenses() {
    return this.getList('budget/expenses').pipe(map(data => data.map(item => new Expense(item))));
  }

  public getExpensesWithKeys() {
    return this.getListWithKeys('budget/expenses').pipe(map(data => data.map(item => new Expense(item.payload.val(), item.payload.key))));;
  }

  public getIncomes() {
    return this.getList('budget/incomes').pipe(map(data => data.map(item => new Income(item))));;
  }

  public getIncomesWithKeys() {
    return this.getListWithKeys('budget/incomes').pipe(map(data => data.map(item => new Income(item.payload.val(), item.payload.key))));
  }

  public getInnerTransfers() {
    return this.getList('budget/innertransfers').pipe(map(data => data.map(item => new InnerTransfer(item))));;
  }

  public getInnerTransfersWithKeys() {
    return this.getListWithKeys('budget/innertransfers').pipe(map(data => data.map(item => new InnerTransfer(item.payload.val(), item.payload.key))));;
  }

  public getLoans() {
    return this.getList('budget/loans').pipe(map(data => data.map(item => new Loan(item))));;
  }

  public getLoansWithKeys() {
    return this.getListWithKeys('budget/loans').pipe(map(data => data.map(item => new Loan(item.payload.val(), item.payload.key))));;
  }

  // add

  public addExpense(data: any) {
    return this.addOneDoc(data, 'budget/expenses');
  }

  public addIncome(data: any) {
    return this.addOneDoc(data, 'budget/incomes');
  }

  public addInnerTransfer(data: any) {
    return this.addOneDoc(data, 'budget/innertransfers');
  }

  public addLoan(data: any) {
    return this.addOneDoc(data, 'budget/loans');
  }

  //update

  public updateExpense(data: any, update_key: string) {
    const path = 'budget/expenses/' + update_key
    return this.updateOneDoc(data, path);
  }

  public updateIncome(data: any, update_key: string) {
    const path = 'budget/incomes/' + update_key
    return this.updateOneDoc(data, path);
  }

  public updateInnerTransfer(data: any, update_key: string) {
    const path = 'budget/innertransfers/' + update_key
    return this.updateOneDoc(data, path);
  }

  public updateLoan(data: any, update_key: string) {
    const path = 'budget/loans/' + update_key
    return this.updateOneDoc(data, path);
  }

  // remove

  public removeExpense(key: string) {
    return this.removeOneDoc('budget/expenses/' + key);
  }

  public removeIncome(key: string) {
    return this.removeOneDoc('budget/incomes/' + key);
  }

  public removeInnerTransfer(key: string) {
    return this.removeOneDoc('budget/innertransfers/' + key);
  }

  public removeLoan(key: string) {
    return this.removeOneDoc('budget/loans/' + key);
  }

}
