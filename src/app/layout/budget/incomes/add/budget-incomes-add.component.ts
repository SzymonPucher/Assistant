import { Component, } from '@angular/core';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { Income } from 'src/app/models/core/income';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';

@Component({
  selector: 'app-budget-incomes-add',
  templateUrl: './budget-incomes-add.component.html',
  styleUrls: ['./budget-incomes-add.component.scss']
})
export class BudgetIncomesAddComponent{

  fields: Array<any>;

  constructor(private budgetService: BudgetApiService) {
    this.fields = [
      new FieldSpec('date', FieldType.date),
      new FieldSpec('source', FieldType.text),
      new FieldSpec('destination', FieldType.text),
      new FieldSpec('amount', FieldType.number),
      new FieldSpec('currency', FieldType.text)
    ]
  }

  public onSubmit(data: object) {
    this.budgetService.addIncome(new Income(data).toDto())
  }
}
