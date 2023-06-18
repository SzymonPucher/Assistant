import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/budget/bill';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';
import { BillApiService } from 'src/app/services/api/bill-api.service';

@Component({
  selector: 'app-budget-bills-add-bulk',
  templateUrl: './budget-bills-add-bulk.component.html',
  styleUrls: ['./budget-bills-add-bulk.component.scss']
})
export class BudgetBillsAddBulkComponent implements OnInit {

  fields: Array<any>;
  bills: Array<Bill>;
  submit_index: number;

  constructor(private billService: BillApiService) {
    this.fields = [
      new FieldSpec('csv data', FieldType.textarea)
    ]
    this.submit_index=0;
  }

  ngOnInit() {

  }

  public onSubmit(data: any): void {
    this.submit_index=1;
    this.csvDataToBills(data);
    for (let index = 0; index < this.bills.length; index++) {
      const bill = this.bills[index];
      console.log(`Adding bill ${this.submit_index} / ${this.bills.length};`);
      
      this.billService.addBill(new Bill(bill).toDto());
      this.submit_index += 1;
    }
  }

  public csvDataToBills(data: any): void {
    /* Example data:
    2023-03-12,Biedronka,Mikołów,Santander Red Card,212.43,PLN
    2023-03-13,Żabka,Mikołów,Santander Red Card,22.10,PLN
    */
    var str = data['csv data'];
    var rows = str.split('\n');
    var values = [];
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index].split(',');
      values.push(this.createBill(element));
    }
    this.bills = values;
  }

  public createBill(bill_data): Bill {
    var date = bill_data[0];
    var vendor = bill_data[1];
    var location = bill_data[2];
    var payment_method = bill_data[3];
    var price = bill_data[4];
    var currency = bill_data[5];

    return Bill.createFromProps(date, vendor, location, payment_method, price, currency);
  }

}

