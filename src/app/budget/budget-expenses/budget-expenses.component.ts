import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Component({
  selector: "app-budget-expenses",
  templateUrl: "./budget-expenses.component.html",
  styleUrls: ["./budget-expenses.component.scss"],
})
export class BudgetExpensesComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  fields: Array<any>;
  doc_path: string;

  update_key: string;

  enableDetails: boolean;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list("expenses", (ref) => ref.orderByChild("Date"));
    // snapshotChanges().map() stores the key
    this.items = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    this.enableDetails = false;
    this.fields = [];
    this.doc_path = "expenses";
  }

  ngOnInit() {}

  toggleDetails() {
    this.enableDetails = !this.enableDetails;
  }

  showDetails(item) {
    var values = [];
    Object.keys(item).forEach((elem) => {
      let val = item[elem] ? item[elem] : "NULL";
      values.push({ label: elem, value: val });
    });
    return values;
  }

  update(item) {
    console.log(item);
    let f = [];

    Object.keys(item).forEach((key) => {
      if (key !== 'key'){
        f.push({ name: key, type: "text", value: item[key] });
      }
    });

    console.log(f);
    
    this.update_key = item.key;
    this.fields = f;
    this.doc_path = "expenses";
    console.log(this.fields);
  }

  closeEdit(){
    this.fields = [];
  }

  delete(key) {
    this.itemsRef.remove(key);
  }
}
