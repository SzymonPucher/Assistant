import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { Expense } from 'src/app/models/core/expense';
import Utils from 'src/app/layout/shared/utils';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent{

  public expenses: Array<any>;
  public outOfScopeExpenses: Array<any>;

  fields: Array<FieldSpec>;

  constructor(private budgetService: BudgetApiService) { 
    this.expenses = [];
    this.outOfScopeExpenses = [];
    this.fields = [
      new FieldSpec('month', FieldType.month)
    ];
  }

  load_products(data: any): void{
    const month = data.month;
    this.budgetService.getExpenses().subscribe((data: Array<Expense>) => {
      this.outOfScopeExpenses = [];
      this.expenses = data.filter((expense: Expense) => expense.date.toString().startsWith(month));
      this.expenses = Utils.sortByProperty(this.expenses, 'date');
    });
  }

  total(): number {
    return Utils.sumByProperty(this.expenses, 'price', 2);
  }

  half(): number {
    return Utils.round(this.total() / 2, 2);
  }

  remove(expense: Expense) {
    this.outOfScopeExpenses.push(expense);
    this.expenses = this.expenses.filter(obj => obj !== expense);
    this.expenses = Utils.sortByProperty(this.expenses, 'date');
    this.outOfScopeExpenses = Utils.sortByProperty(this.outOfScopeExpenses, 'date');
  }

  restore(expense: Expense) {
    this.expenses.push(expense);
    this.outOfScopeExpenses = this.outOfScopeExpenses.filter(obj => obj !== expense);
    this.expenses = Utils.sortByProperty(this.expenses, 'date');
    this.outOfScopeExpenses = Utils.sortByProperty(this.outOfScopeExpenses, 'date');
  }
}
