import { Component, } from '@angular/core';

@Component({
  selector: 'app-budget-incomes-add',
  templateUrl: './budget-incomes-add.component.html',
  styleUrls: ['./budget-incomes-add.component.scss']
})
export class BudgetIncomesAddComponent{

  fields: Array<any>;
  doc_path: string;


  constructor() {
    this.fields = [
      {name: 'Date', type: 'date'},
      {name: 'Source', type: 'text'},
      {name: 'Destination', type: 'text'},
      {name: 'Amount', type: 'number'},
      {name: 'Currency', type: 'text'}
    ]
    this.doc_path = 'budget/incomes';
  }

}
