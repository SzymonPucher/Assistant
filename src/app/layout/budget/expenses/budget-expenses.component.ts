import { Component, OnInit } from "@angular/core";
import Utils from '../../shared/utils';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { Expense } from 'src/app/models/core/expense';

@Component({
  selector: "app-budget-expenses",
  templateUrl: "./budget-expenses.component.html",
  styleUrls: ["./budget-expenses.component.scss"],
})
export class BudgetExpensesComponent implements OnInit {
  
  displayItems: Map<string, Map<string, Expense[]>>;

  currentlyEditedExpense: Expense;

  constructor(private budgetService: BudgetApiService) {
    this.displayItems = new Map<string, Map<string, Expense[]>>();
    this.currentlyEditedExpense = undefined;
  }

  ngOnInit() {
      this.budgetService.getExpensesWithKeys().subscribe((expenses: Array<Expense>) => {
        this.prepareData(expenses);
      });
  }

  private prepareData(expenses: Array<Expense>): void {

    this.displayItems = new Map<string, Map<string, Expense[]>>();

    expenses.forEach((expense: Expense) => {
      let date = expense.date.toString();
      let vendor = expense.vendor;
      if (this.displayItems.has(date)) {
        if (this.displayItems.get(date).has(vendor)) {
          let val = this.displayItems.get(date).get(vendor);
          val.push(expense);
          this.displayItems.get(date).set(vendor, val);
        }
        else {
          this.displayItems.get(date).set(vendor, [expense]);
        }
      }
      else {
        let newDateMap = new Map<string, Expense[]>();
        newDateMap.set(vendor, [expense]);
        this.displayItems.set(date, newDateMap)
      }
    });
  }

  openUpdateForm(expense: Expense) {
    this.currentlyEditedExpense = expense;
  }

  closeEditForm() {
    this.currentlyEditedExpense = undefined;
  }

  onSubmit(data: any) {
    this.budgetService.updateExpense(new Expense(data).toDto(),  this.currentlyEditedExpense.getKey());    
  }

  delete(expense: Expense) {
    this.budgetService.removeExpense(expense.getKey());
    this.closeEditForm();
  }

  getMapKeys(mapObj: Map<any, any>, reverse=true){
    let keys = Array.from(mapObj.keys());
    keys.sort();
    if (reverse){
      keys = keys.reverse();
    }
    return keys;
  }

  getSumInMap(date: string, vendor: string){
    let sum = 0;
    this.displayItems.get(date).get(vendor).forEach((expense: Expense) => {
      sum += expense.price;
    });
    return Utils.round(sum, 2).toString() + ' ' + this.displayItems.get(date).get(vendor)[0].currency;
  }

  getPaymentMethods(date: string, vendor: string) {
    let paymentMethods = [];
    this.displayItems.get(date).get(vendor).forEach(element => {
      if (!paymentMethods.includes(element['payment_method'])) {
        paymentMethods.push(element['payment_method']);
      }
    });
    return paymentMethods;
  }
}
