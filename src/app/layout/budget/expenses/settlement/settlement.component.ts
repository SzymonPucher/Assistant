import { Component } from '@angular/core';
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
export class SettlementComponent {

  public expenses: Array<any>;
  public outOfScopeExpenses: Array<any>;
  public outOfScopeExpensesNela: Array<any>;
  public payment_methods: Set<string>;
  public payment_methods_nela: Set<string>;


  fields: Array<FieldSpec>;

  constructor(private budgetService: BudgetApiService) {
    this.expenses = [];
    this.outOfScopeExpenses = [];
    this.outOfScopeExpensesNela = [];
    this.payment_methods = new Set<string>();
    this.payment_methods_nela = new Set<string>();
    this.fields = [
      new FieldSpec('start', FieldType.date),
      new FieldSpec('finish', FieldType.date)
    ];
  }

  load_products(timeperiod: any): void {
    this.budgetService.getExpenses().subscribe((data: Array<Expense>) => {
      this.outOfScopeExpenses = [];
      this.expenses = data.filter((expense: Expense) => expense.date.toString() >= timeperiod.start && expense.date.toString() <= timeperiod.finish);
      this.expenses = Utils.sortByProperty(this.expenses, 'vendor');
      this.expenses.forEach(element => {
        this.payment_methods.add(element.payment_method);
      });
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

  removeNela(expense: Expense) {
    this.outOfScopeExpensesNela.push(expense);
    this.expenses = this.expenses.filter(obj => obj !== expense);
    this.expenses = Utils.sortByProperty(this.expenses, 'date');
    this.outOfScopeExpensesNela = Utils.sortByProperty(this.outOfScopeExpensesNela, 'date');
  }

  restore(expense: Expense) {
    this.expenses.push(expense);
    this.outOfScopeExpenses = this.outOfScopeExpenses.filter(obj => obj !== expense);
    this.expenses = Utils.sortByProperty(this.expenses, 'date');
    this.outOfScopeExpenses = Utils.sortByProperty(this.outOfScopeExpenses, 'date');
  }

  mv_pm_to_nela(pm) {
    this.payment_methods_nela.add(pm);
    this.payment_methods.delete(pm);
  }

  mv_pm_to_szymon(pm) {
    this.payment_methods.add(pm);
    this.payment_methods_nela.delete(pm);
  }

  getRes() {
    let Szymon_gives_Nela = 0;
    let Nela_gives_Szymon = 0;
    this.expenses.forEach(element => {
      if(this.payment_methods.has(element.payment_method)) {
        // Karta Szymona
        Nela_gives_Szymon += element.price / 2;
      }
      else {
        Szymon_gives_Nela += element.price / 2;
      }
    });

    this.outOfScopeExpenses.forEach(element => {
      if(this.payment_methods_nela.has(element.payment_method)) {
        // Karta Szymona
        Szymon_gives_Nela += element.price;
      }
    });

    this.outOfScopeExpensesNela.forEach(element => {
      if(this.payment_methods.has(element.payment_method)) {
        // Karta Neli
        Nela_gives_Szymon += element.price;
      }
    });

    return Nela_gives_Szymon - Szymon_gives_Nela;
  }
}
