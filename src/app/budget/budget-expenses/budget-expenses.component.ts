import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-budget-expenses',
  templateUrl: './budget-expenses.component.html',
  styleUrls: ['./budget-expenses.component.scss']
})
export class BudgetExpensesComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('expenses', ref => ref.orderByChild('Date'));
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ngOnInit() {
  }

  delete(key){
    this.itemsRef.remove(key);
  }
}
