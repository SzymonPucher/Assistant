import { Component } from '@angular/core';

@Component({
  selector: 'app-budget-innertransfer-add',
  templateUrl: './budget-innertransfer-add.component.html',
  styleUrls: ['./budget-innertransfer-add.component.scss']
})
export class BudgetInnertransferAddComponent {

  fields: Array<any>;
  doc_path: string;


  constructor() {
    this.fields = [
      {name: 'Date', type: 'date'},
      {name: 'Destination', type: 'text'},
      {name: 'Destination amount', type: 'number'},
      {name: 'Destination currency', type: 'text'},
      {name: 'Source', type: 'text'},
      {name: 'Source amount', type: 'number'},
      {name: 'Source currency', type: 'text'}
    ]
    this.doc_path = 'budget/innertransfers';
  }

}
