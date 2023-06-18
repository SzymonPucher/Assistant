import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/budget/bill';
import { BillApiService } from 'src/app/services/api/bill-api.service';
import Utils from '../../shared/utils';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-budget-bills',
  templateUrl: './budget-bills.component.html',
  styleUrls: ['./budget-bills.component.scss']
})
export class BudgetBillsComponent implements OnInit {

  bills: Array<Bill>;
  grouped_bills: Map<String, Bill[]>;
  displayedColumns: Array<string> = ['date', 'price', 'vendor', 'location', 'payment_method', 'actions'];
  simpleForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    freeTextFilter: new FormControl(''),

  });

  constructor(private billService: BillApiService) {
    this.bills = Array<Bill>();
    this.grouped_bills = new Map<String, Bill[]>();
  }

  ngOnInit() {
    this.billService.getBillsWithKeys().subscribe((bills: Array<Bill>) => {     
      bills.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
      this.bills = bills;
      console.log(this.bills);
    });
  }

  public edit(item: Bill){
    console.log('Updating');
    this.getBillsFiltered();
  }

  public delete(item: Bill){
    console.log('Removing');
    
    this.billService.removeBill(item.key)
  }

  getMapKeys(mapObj: Map<any, any>, reverse=true){
    let keys = Array.from(mapObj.keys());
    keys.sort();
    if (reverse){
      keys = keys.reverse();
    }
    return keys;
  }

  public getBillsFiltered(){
    var startDate = this.simpleForm.value['startDate'];
    var endDate = this.simpleForm.value['endDate'];
    var freeTextFilter = this.simpleForm.value['freeTextFilter'];
    console.log(startDate, endDate, freeTextFilter);
    var values = this.bills;
    if (startDate.length > 0) {
      values = values.filter((a) => a.date >= startDate);
    }

    if (endDate.length > 0) {
      values = values.filter((a) => a.date <= endDate);
    }
    if (freeTextFilter.length > 0) {
      values = values.filter(
        (a) => a.vendor.includes(freeTextFilter) ||
        a.location.includes(freeTextFilter) ||
        a.payment_method.includes(freeTextFilter) ||
        a.currency.includes(freeTextFilter) ||
        a.date.includes(freeTextFilter)
      );
    }

    return values;

  }

}
