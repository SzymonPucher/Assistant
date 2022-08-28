import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/budget/bill';
import { BillApiService } from 'src/app/services/api/bill-api.service';
import Utils from '../../shared/utils';

@Component({
  selector: 'app-budget-bills',
  templateUrl: './budget-bills.component.html',
  styleUrls: ['./budget-bills.component.scss']
})
export class BudgetBillsComponent implements OnInit {

  bills: Array<Bill>;
  grouped_bills: Map<String, Map<String, Bill[]>>;

  constructor(private billService: BillApiService) { 
    this.bills = Array<Bill>();
    this.grouped_bills = new Map<String, Map<String, Bill[]>>();
  }

  ngOnInit() {
    this.billService.getBillsWithKeys().subscribe((bills: Array<Bill>) => {
      this.bills = bills;
      this.groupBills();
    });
  }

  public groupBills() {
    this.grouped_bills = new Map<String, Map<String, Bill[]>>();
    
    this.bills.forEach((bill: Bill) => {
      let date = bill.date.toString().slice(0,7);
      let vendor = `${bill.vendor} - ${bill.payment_method}`;
      if (this.grouped_bills.has(date)) {
        if (this.grouped_bills.get(date).has(vendor)) {
          let val = this.grouped_bills.get(date).get(vendor);
          val.push(bill);
          this.grouped_bills.get(date).set(vendor, val);
        }
        else {
          this.grouped_bills.get(date).set(vendor, [bill]);
        }
      }
      else {
        let newDateMap = new Map<string, Bill[]>();
        newDateMap.set(vendor, [bill]);
        this.grouped_bills.set(date, newDateMap)
      }
    });
    console.log(this.grouped_bills);
    
  }

  getMapKeys(mapObj: Map<any, any>, reverse=true){
    let keys = Array.from(mapObj.keys());
    keys.sort();
    if (reverse){
      keys = keys.reverse();
    }
    return keys;
  }

  getSumInMap(date: string, vendor: string){
    let sum = 0;
    this.grouped_bills.get(date).get(vendor).forEach((expense: Bill) => {
      sum += expense.price;
    });
    return Utils.round(sum, 2).toString() + ' ' + this.grouped_bills.get(date).get(vendor)[0].currency;
  }

}
