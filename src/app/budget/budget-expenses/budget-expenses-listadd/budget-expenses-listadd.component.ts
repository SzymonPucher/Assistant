import { Component, OnInit } from "@angular/core";
import { BudgetService } from "src/app/services/budget.service";
import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: "app-budget-expenses-listadd",
  templateUrl: "./budget-expenses-listadd.component.html",
  styleUrls: ["./budget-expenses-listadd.component.scss"],
})
export class BudgetExpensesListaddComponent implements OnInit {
  expenses: Observable<any>;
  expenses_list: Array<any>;

  basket: Array<any>;
  show_final_form: boolean;

  bs;

  basketForm = new FormGroup({
    Location: new FormControl('', Validators.required),
    VendorType: new FormControl('', Validators.required),
    Vendor: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),
    PaymentMethod: new FormControl('', Validators.required), 
  });
  
  constructor(bs: BudgetService) {
    this.expenses = bs.get_expenses();
    this.expenses_list = [];
    this.basket = [];
    this.show_final_form = false;
    this.bs = bs;
    
  }

  ngOnInit() {
    this.expenses.subscribe((data) => {
      this.expenses_list = this.expenses_list.concat(data);
      this.makeExpensesUnique();
      console.log(this.expenses_list);
    });
  }

  makeExpensesUnique() {
    let arr = [];
    this.expenses_list.forEach((element) => {
      let newObj = element;
      delete newObj["Date"];
      delete newObj["Payment Method"];
      delete newObj["Location"];
      delete newObj["Vendor"];
      delete newObj["Vendor Type"];

      newObj.hash = JSON.stringify(newObj);
      arr.push(newObj);
    });
    arr = arr.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.hash).indexOf(obj.hash) === pos;
    });
    
    arr.forEach(element => {
      delete element.hash
    });

    arr.sort((a, b) => (a.Product > b.Product) ? 1 : -1)

    this.expenses_list = arr;
  }

  getItemProperties(item){
    return Object.getOwnPropertyNames(item).filter((x) => !['Product', 'Category', 'Subcategory', 'Price', 'Currency'].includes(x))
  }

  addToBasket(item){
    this.basket.push(item);
    console.log(this.basket);
    
  }

  apply() {
    this.toggle();
    console.log('Basket: ', this.basket);
  }

  toggle(){
    this.show_final_form = !this.show_final_form;
  }

  submit_items() {
    console.log(this.basketForm);
    
    let arr = [];
    console.log('Submit: ', this.basket);
    
    this.basket.forEach(element => {
      let newObj = element;
      newObj['Location'] = this.basketForm.value.Location;
      newObj['Vendor Type'] = this.basketForm.value.VendorType;
      newObj['Vendor'] = this.basketForm.value.Vendor;
      newObj['Date'] = this.basketForm.value.Date;
      newObj['Payment Method'] = this.basketForm.value.PaymentMethod;
      this.bs.addOneDoc(newObj, 'expenses_test');
    });
    
  }

}
