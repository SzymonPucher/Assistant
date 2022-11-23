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
  grouped_bills: Map<String, Bill[]>;

  constructor(private billService: BillApiService) { 
    this.bills = Array<Bill>();
    this.grouped_bills = new Map<String, Bill[]>();
  }

  ngOnInit() {
    this.billService.getBillsWithKeys().subscribe((bills: Array<Bill>) => {
      this.bills = bills;
      this.groupBills();
    });
  }

  public groupBills() {
    this.grouped_bills = new Map<String, Bill[]>();
    
    this.bills.forEach((bill: Bill) => {
      let date = bill.date.toString().slice(0,10);
      if (this.grouped_bills.has(date)) {
        this.grouped_bills.get(date).push(bill);
      }
      else {
        this.grouped_bills.set(date, [bill])
      }
    });
  }

  getMapKeys(mapObj: Map<any, any>, reverse=true){
    let keys = Array.from(mapObj.keys());
    keys.sort();
    if (reverse){
      keys = keys.reverse();
    }
    return keys;
  }

}
