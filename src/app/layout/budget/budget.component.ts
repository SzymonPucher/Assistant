import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { Expense } from 'src/app/models/core/expense';
import { Income } from 'src/app/models/core/income';

@Component({
  selector: "app-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.scss"],
})
export class BudgetComponent implements OnInit {
  expenses_list: Array<any>;
  incomes_list: Array<any>;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: "expenses" },
    { data: [], label: "incomes" },
  ];
  all_expenses = 0;
  all_incomes = 0;

  constructor(public budgetService: BudgetApiService) {

    this.expenses_list = [];
    this.incomes_list = [];
  }

  ngOnInit() {
    this.budgetService.getExpenses().subscribe((expenses: Array<Expense>) => {
      this.expenses_list = expenses;
      this.budgetService.getIncomes().subscribe((incomes: Array<Income>) => {
        this.incomes_list = incomes;
        this.calculate();
        this.calculate_totals();
      });
    });
  }

  private calculate_totals() {
    this.expenses_list.forEach(element => {
      this.all_expenses += element['price'];
    });
    this.incomes_list.forEach(element => {
      this.all_incomes += element['amount'];
    });
    this.all_expenses = Math.round(this.all_expenses * 100) / 100
    this.all_incomes = Math.round(this.all_incomes * 100) / 100
  }

  private groupBy(key, val, arr) {
    let map = new Map<string, number>();

    arr.forEach((element) => {
      let keys = Array.from(map.keys());
      if (keys.includes(element[key].substring(0, 7))) {
        map.set(
          element[key].substring(0, 7),
          map.get(element[key].substring(0, 7)) + element[val]
        );
      } else {
        map.set(element[key].substring(0, 7), element[val]);
      }
    });
    return map;
  }


  private calculate(){
    let expenses_map = this.groupBy("date", "price", this.expenses_list);
    let incomes_map = this.groupBy("date", "amount", this.incomes_list);
    let joined_map = new Map<string, [number, number]>();
    

    Array.from(expenses_map.keys()).forEach((element) => {
      joined_map.set(element, [(joined_map.get(element) ? joined_map.get(element)[0] : 0) + expenses_map.get(element), (joined_map.get(element) ? joined_map.get(element)[1] : 0)]);
    });

    Array.from(incomes_map.keys()).forEach((element) => {
      joined_map.set(element, [(joined_map.get(element) ? joined_map.get(element)[0] : 0), (joined_map.get(element) ? joined_map.get(element)[1] : 0) + incomes_map.get(element)]);
    });

    Array.from(joined_map.keys()).sort().forEach(element => {
      this.barChartLabels.push(element);
      this.barChartData[0].data.push(Math.round(joined_map.get(element)[0] * 100) / 100);
      this.barChartData[1].data.push(Math.round(joined_map.get(element)[1] * 100) / 100);
    });

  }
}