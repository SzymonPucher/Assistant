import { Component } from '@angular/core';

@Component({
  selector: 'app-budget-expenses-simpleadd',
  templateUrl: './budget-expenses-simpleadd.component.html',
  styleUrls: ['./budget-expenses-simpleadd.component.scss']
})

export class BudgetExpensesSimpleaddComponent {

  fields: Array<any>;
  doc_path: string;


  constructor() {
    this.fields = [
      {name: 'Location', type: 'text'},
      {name: 'Vendor Type', type: 'text'},
      {name: 'Vendor', type: 'text'},
      {name: 'Payment Method', type: 'text'},
      {name: 'Currency', type: 'text'},
      {name: 'Date', type: 'date'},
      {name: 'Category', type: 'text'},
      {name: 'Subcategory', type: 'text'},
      {name: 'Product', type: 'text'},
      {name: 'Price', type: 'number'}
    ]
    this.doc_path = 'expenses';
  }
  
}
