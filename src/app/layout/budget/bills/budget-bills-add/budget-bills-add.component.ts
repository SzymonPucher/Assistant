import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/budget/bill';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';
import { BillApiService } from 'src/app/services/api/bill-api.service';

@Component({
  selector: 'app-budget-bills-add',
  templateUrl: './budget-bills-add.component.html',
  styleUrls: ['./budget-bills-add.component.scss']
})
export class BudgetBillsAddComponent implements OnInit {

  fields: Array<any>;
  bills: Array<Bill>;

  constructor(private billService: BillApiService) {
    this.fields = [
      new FieldSpec('date', FieldType.date),
      new FieldSpec('vendor', FieldType.text),
      new FieldSpec('location', FieldType.text),
      new FieldSpec('payment_method', FieldType.text),
      new FieldSpec('price', FieldType.number),
      new FieldSpec('currency', FieldType.text)
    ]
  }

  ngOnInit() {
    this.billService.getBillsWithKeys().subscribe((bills: Array<Bill>) => {
      this.bills = bills.slice(-2).reverse();
    });
  }

  public onSubmit(data: any): void {
    this.billService.addBill(new Bill(data).toDto());
  }

  public deleteBill(bill_key) {
    this.billService.removeBill(bill_key);
  }
}
