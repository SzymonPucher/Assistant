import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Component({
  selector: "app-budget-expenses",
  templateUrl: "./budget-expenses.component.html",
  styleUrls: ["./budget-expenses.component.scss"],
})
export class BudgetExpensesComponent implements OnInit {
  itemsRef: AngularFireList<any>;

  displayItems: Map<String, Map<String, object[]>>;

  fields: Array<any>;
  doc_path: string;

  update_key: string;

  enableDetails: boolean;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list("budget/expenses", (ref) => ref.orderByChild("Date"));
    // snapshotChanges().map() stores the key
    this.displayItems = new Map<String, Map<String, object[]>>();
    this.enableDetails = false;
    this.fields = [];
    this.doc_path = "budget/expenses";
  }

  ngOnInit() {
    this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => (this.displayItems = this.prepareData(data)));
  }

  toggleDetails() {
    this.enableDetails = !this.enableDetails;
  }

  prepareData(data) {
    let m = new Map<String, Map<String, object[]>>();
    data.forEach((element) => {
      let date = element.Date;
      let vendor = element.Vendor;
      if (m.has(date)) {
        if (m.get(date).has(vendor)) {
          let val = m.get(date).get(vendor);
          val.push(element);
          m.get(date).set(vendor, val);
        }
        else {
          m.get(date).set(vendor, [element]);
        }
      }
      else {
        let nm = new Map<string, object[]>();
        nm.set(vendor, [element]);
        m.set(date, nm)
      }
    });
    return m;
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
      if (key !== "key") {
        f.push({ name: key, type: "text", value: item[key] });
      }
    });

    this.update_key = item.key;
    this.fields = f;
    this.doc_path = "budget/expenses";
  }

  closeEdit() {
    this.fields = [];
  }

  delete(key) {
    this.itemsRef.remove(key);
    this.closeEdit();
  }

  getMapKeys(m, reverse=true){
    let keys = Array.from(m.keys());
    keys.sort();
    if (reverse){
      keys = keys.reverse();
    }
    return keys;
  }

  getSumInMap(date, vendor){
    let s = 0;
    this.displayItems.get(date).get(vendor).forEach(element => {
      s += element['Price'];
    });
    s = Math.round(s * 100) / 100
    return s.toString() + ' ' + this.displayItems.get(date).get(vendor)[0]['Currency'];
  }
}
