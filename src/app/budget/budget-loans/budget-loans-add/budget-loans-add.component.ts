import { Component } from '@angular/core';

@Component({
  selector: 'app-budget-loans-add',
  templateUrl: './budget-loans-add.component.html',
  styleUrls: ['./budget-loans-add.component.scss']
})
export class BudgetLoansAddComponent {

  fields: Array<any>;
  doc_path: string;


  constructor() {
    this.fields = [
      {name: 'Lender', type: 'text'},
      {name: 'Borrower', type: 'text'},
      {name: 'Amount', type: 'number'},
      {name: 'Currency', type: 'text'},
      {name: 'Account', type: 'text'},
      {name: 'Start', type: 'date'},
      {name: 'Due', type: 'date'},
      {name: 'Description', type: 'text'}
    ]
    this.doc_path = 'loans';
  }

}
