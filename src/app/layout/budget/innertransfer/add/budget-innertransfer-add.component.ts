import { Component } from '@angular/core';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';
import { InnerTransfer } from 'src/app/models/core/innertransfer';

@Component({
  selector: 'app-budget-innertransfer-add',
  templateUrl: './budget-innertransfer-add.component.html',
  styleUrls: ['./budget-innertransfer-add.component.scss']
})
export class BudgetInnertransferAddComponent {

  fields: Array<any>;

  constructor(private budgetService: BudgetApiService) {
    this.fields = [
      new FieldSpec('date', FieldType.date),
      new FieldSpec('source', FieldType.text),
      new FieldSpec('source_amount', FieldType.number),
      new FieldSpec('source_currency', FieldType.text),
      new FieldSpec('destination', FieldType.text),
      new FieldSpec('destination_amount', FieldType.number),
      new FieldSpec('destination_currency', FieldType.text)
    ]
  }

  public onSubmit(data: any): void {
    this.budgetService.addInnerTransfer(new InnerTransfer(data).toDto());
  }
}
