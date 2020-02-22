import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { map } from 'rxjs/operators';
import { MultivalueListComponent } from '../../common/multivalue-list/multivalue-list.component'


@Component({
  selector: 'app-budget-expenses',
  templateUrl: './budget-expenses.component.html',
  styleUrls: ['./budget-expenses.component.scss']
})
export class BudgetExpensesComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  enableDetails: boolean;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('expenses', ref => ref.orderByChild('Date'));
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.enableDetails = false;
  }

  ngOnInit() {
  }

  toggleDetails(){
    this.enableDetails = !this.enableDetails;
  }

  showDetails(item){
    var values = [];
    Object.keys(item).forEach(elem => {
      let val = item[elem] ? item[elem] : 'NULL';
      values.push({label: elem, value: val});
    });    
    return values;
  }

  delete(key){
    this.itemsRef.remove(key);
  }
}
