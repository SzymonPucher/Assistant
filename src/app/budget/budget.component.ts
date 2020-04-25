import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { BudgetService } from "../services/budget.service";

@Component({
  selector: "app-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.scss"],
})
export class BudgetComponent implements OnInit {
  expenses: Observable<any[]>;
  incomes: Observable<any[]>;

  expenses_list: Array<any>;
  incomes_list: Array<any>;

  a: Array<any>;
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

  constructor(bs: BudgetService) {
    this.expenses = bs.get_expenses();
    this.incomes = bs.get_incomes();

    this.expenses_list = [];
    this.incomes_list = [];
  }

  ngOnInit() {
    this.expenses.subscribe((data) => {
      this.expenses_list = this.expenses_list.concat(data);
      this.incomes.subscribe((data) => {
        this.incomes_list = this.incomes_list.concat(data);
        this.calculate();
        this.calculate_current_state();
      });
    });
  }

  calculate_current_state(){
    this.expenses_list.forEach(element => {
      this.all_expenses += element['Price'];
    });
    this.incomes_list.forEach(element => {
      this.all_incomes += element['Amount'];
    });
    this.all_expenses = Math.round(this.all_expenses * 100) / 100
    this.all_incomes = Math.round(this.all_incomes * 100) / 100
  }

  groupBy(key, val, arr) {
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


  calculate(){
    let expenses_map = this.groupBy("Date", "Price", this.expenses_list);
    let incomes_map = this.groupBy("Date", "Amount", this.incomes_list);
    let joined_map = new Map<string, [number, number]>();
    

    Array.from(expenses_map.keys()).forEach((element) => {
      if (Array.from(joined_map.keys()).includes(element)) {
        joined_map.set(
          element,
          [joined_map.get(element)[0] + expenses_map.get(element), joined_map.get(element)[1]]
        );
      } else {
        joined_map.set(element, [expenses_map.get(element), 0])
      }
    });

    Array.from(incomes_map.keys()).forEach((element) => {
      if (Array.from(joined_map.keys()).includes(element)) {
        joined_map.set(
          element,
          [joined_map.get(element)[0], joined_map.get(element)[1] + incomes_map.get(element)]
        );
      } else {
        joined_map.set(element, [0, incomes_map.get(element)])
      }
    });

    Array.from(joined_map.keys()).sort().forEach(element => {
      this.barChartLabels.push(element);
      this.barChartData[0].data.push(Math.round(joined_map.get(element)[0] * 100) / 100);
      this.barChartData[1].data.push(Math.round(joined_map.get(element)[1] * 100) / 100);

    });

  }
}