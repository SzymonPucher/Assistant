import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-budget-expenses-simpleadd',
  templateUrl: './budget-expenses-simpleadd.component.html',
  styleUrls: ['./budget-expenses-simpleadd.component.scss']
})

export class BudgetExpensesSimpleaddComponent {

  fields: string[];
  doc_path: string;


  constructor(public db: AngularFireDatabase) {
    this.fields = [
      'Location',
      'Vendor Type',
      'Vendor',
      'Payment Method',
      'Currency',
      'Date',
      'Category',
      'Subcategory',
      'Product',
      'Price'
    ]
    this.doc_path = 'expenses';
  }
  
}
