import { Component, OnInit } from '@angular/core';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { Income } from 'src/app/models/core/income';
import Utils from '../../shared/utils';
import { FieldSpec } from 'src/app/models/field-spec';

@Component({
  selector: 'app-budget-incomes',
  templateUrl: './budget-incomes.component.html',
  styleUrls: ['./budget-incomes.component.scss']
})
export class BudgetIncomesComponent implements OnInit {

  items: Array<Income>;
  fields: Array<FieldSpec>;
  update_key: string;

  constructor(private budgetService: BudgetApiService) {
    this.items = [];
    this.fields = [];
    this.update_key = undefined;
  }

  ngOnInit() {
    this.budgetService.getIncomesWithKeys().subscribe(response => {
      this.items = Utils.sortByProperty(response, 'date', true);
    });
  }

  openEdit(item: Income): void {
    this.update_key = item.getKey();
    this.fields = item.getFieldSpecs();
  }

  closeEdit(): void {
    this.fields = [];
  }

  updateSubmitted(data: any): void {
    this.budgetService.updateIncome(new Income(data).toDto(), this.update_key);    
  }

  delete(): void {
    this.budgetService.removeIncome(this.update_key);
    this.closeEdit();
  }
}
