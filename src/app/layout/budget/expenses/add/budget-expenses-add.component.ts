import { Component } from '@angular/core';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';
import { Expense } from 'src/app/models/core/expense';
import Utils from 'src/app/layout/shared/utils';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-budget-expenses-add',
  templateUrl: './budget-expenses-add.component.html',
  styleUrls: ['./budget-expenses-add.component.scss'],
})
export class BudgetExpensesAddComponent {

  expenses$: Observable<any>;
  
  expenses_list: Array<Expense>;
  basket: Array<Expense>;

  addFormFields: Array<FieldSpec>;
  basketFormFields: Array<FieldSpec>;

  spinner: boolean;
  show_add_form: boolean;
  show_list_add: boolean;
  show_final_form: boolean;

  searchForm: FormGroup;

  sub: Subscription;

  constructor(private budgetService: BudgetApiService) {
    
    this.expenses_list = [];
    this.basket = [];

    this.basketFormFields = [
      new FieldSpec('location', FieldType.text),
      new FieldSpec('vendor_type', FieldType.text),
      new FieldSpec('vendor', FieldType.text),
      new FieldSpec('date', FieldType.date),
      new FieldSpec('payment_method', FieldType.text)
    ];

    this.addFormFields = [
      new FieldSpec('category', FieldType.text),
      new FieldSpec('subcategory', FieldType.text),
      new FieldSpec('product', FieldType.text),
      new FieldSpec('price', FieldType.number),
      new FieldSpec('currency', FieldType.text)
    ]

    this.show_list_add = true;
    this.show_add_form = false;
    this.show_final_form = false;

    this.spinner = false;
    this.sub = new Subscription();

    this.searchForm = new FormGroup({searchInput: new FormControl('')});

    this.expenses$ = this.budgetService.getExpenses();
  }

  public search(): void {
    this.expenses_list = [];
    this.spinner = true;
    this.sub.unsubscribe();
    this.sub = this.expenses$.subscribe((expenses: Array<Expense>) => {      
        this.expenses_list = this.makeExpensesUnique(
          expenses.filter((e: Expense) => 
            Utils.strInStr(this.searchForm.value.searchInput, e.getHash(true))));
        this.spinner = false;
      });
  }

  makeExpensesUnique(expenses: Array<Expense>): Array<Expense> {
    expenses = expenses.filter((obj, pos, arr) => pos === arr.findIndex(o => (o.getHash() === obj.getHash())));
    return Utils.sortByProperty(expenses, 'product');
  }

  getItemProperties(item: Expense): Array<any> {
    return Object.keys(item.otherProperties).map(key => ({ key, value: item.otherProperties[key] }));
  }

  editAndAdd(expense: Expense): void {
    this.addFormFields = expense.getGenericFieldSpecs();
    this.showAddForm();
  }

  addToBasket(expense: Expense): void {
    this.basket.push(expense);
  }

  addNewToBasket(data: any): void {    
    this.basket.push(new Expense(data));
  }

  showAddList(): void {
    this.show_list_add = true;
    this.show_add_form = false;
    this.show_final_form = false;
  }

  showAddForm(): void {
    this.show_add_form = true;
    this.show_list_add = false;
    this.show_final_form = false;    
  }

  showFinalForm(): void {    
    this.show_final_form = true;
    this.show_list_add = false;
    this.show_add_form = false;
  }

  getBasketSum(): number {
    return Utils.sumByProperty(this.basket, 'price', 2);
  }

  deleteItemFromBasket(expense: Expense): void {
    this.basket = this.basket.filter((obj: Expense) => obj !== expense);
  }

  submitBasket(data: any): void {
    this.basket.forEach((expense: Expense) => {
      expense.replaceGroupingFields(data);   
      this.budgetService.addExpense(expense.toDto());
    });
    window.alert(`Added ${this.basket.length} items`);
  }
}
