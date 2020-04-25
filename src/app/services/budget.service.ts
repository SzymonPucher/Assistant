import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  expenses: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { 
  }

  get_expenses(){
    return this.db.list('expenses').valueChanges();
  }

  get_incomes(){
    return this.db.list('incomes').valueChanges();
  }

  addOneDoc(obj, path){
    this.db.list(path).push(obj);
  }
}
