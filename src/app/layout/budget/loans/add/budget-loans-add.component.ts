import { Component } from '@angular/core';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { Loan } from 'src/app/models/core/loan';

@Component({
  selector: 'app-budget-loans-add',
  templateUrl: './budget-loans-add.component.html',
  styleUrls: ['./budget-loans-add.component.scss']
})
export class BudgetLoansAddComponent {

  fields: Array<any>;

  constructor(private budgetService: BudgetApiService) {
    this.fields = [
      new FieldSpec('lender', FieldType.text),
      new FieldSpec('borrower', FieldType.text),
      new FieldSpec('amount', FieldType.number),
      new FieldSpec('currency', FieldType.text),
      new FieldSpec('account', FieldType.text),
      new FieldSpec('start', FieldType.date),
      new FieldSpec('due', FieldType.date),
      new FieldSpec('description', FieldType.text)
    ]
  }

  onSubmit(data: any): void {
    this.budgetService.addLoan(new Loan(data).toDto());
  }
}
