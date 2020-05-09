import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import Utils from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  expenses: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { 
  }

  private getList(path: string) {
    return this.db.list(path).valueChanges();
  }


  private addOneDoc(obj: any, path: string){
    Object.keys(obj).forEach(key => {
      obj[key] = Utils.try_to_convert(obj[key])
    });
    return this.db.list(path).push(obj);
  }

  private updateOneDoc(updatedObj: any, path: string) {

    Object.keys(updatedObj).forEach(key => {
      updatedObj[key] = Utils.try_to_convert(updatedObj[key])
    });

    return this.db.object(path).update(updatedObj);
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
