import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  expenses: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { 
    var today = new Date()
    var date_str = (today.getFullYear() - 1).toString() + '-' + today.getMonth().toString() + '-' + today.getDate().toString()
    //this.expenses = db.list('expenses', ref => ref.orderByChild('Date').startAt(date_str)).valueChanges();
    this.expenses = db.list('expenses', ref => ref).valueChanges();
  }

  get_expenses(){
    return this.expenses;
  }
}
