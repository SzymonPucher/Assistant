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
    return this.getList('expenses');
  }

  public getIncomes() {
    return this.getList('incomes');
  }

  public addExpense(data: any){
    return this.addOneDoc(data, 'expenses');
  }

  public updateExpense(data: any, update_key: string) {
    const path = 'expenses/' + update_key
    return this.updateOneDoc(data, path);
  }
}
