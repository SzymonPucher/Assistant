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
  all_expenses_raw: Array<any>;

  basket: Array<any>;
  fields: Array<any>;
  show_final_form: boolean;
  spinner: boolean;
  show_add_form: boolean;
  show_list_add: boolean;

  bs: BudgetService;

  newItemForm: FormGroup;
  fieldTypes = ['text', 'number']

  newFieldName = new FormControl('', Validators.required);
  newFieldType = new FormControl('', Validators.required);


  basketForm = new FormGroup({
    Location: new FormControl('', Validators.required),
    VendorType: new FormControl('', Validators.required),
    Vendor: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),
    PaymentMethod: new FormControl('', Validators.required), 
  });
  
  constructor(bs: BudgetService) {
    this.bs = bs;
    this.expenses = bs.get_expenses();
    this.expenses_list = [];
    this.all_expenses_raw = [];
    this.basket = [];
    this.fields = [{name: 'Category', type: 'text'}, {name: 'Subcategory', type: 'text'}, {name: 'Product', type: 'text'}, {name: 'Price', type: 'number'}, {name: 'Currency', type: 'text'},]

    this.show_add_form = false;
    this.show_final_form = false;
    this.spinner = true;
    this.show_list_add = true;

    let group={}    
    this.fields.forEach(element=>{
      group[element.name] = new FormControl('', Validators.required);  
    })

    this.newItemForm = new FormGroup(group);
    
  }

  ngOnInit() {
    this.expenses.subscribe((data) => {
      this.all_expenses_raw = this.all_expenses_raw.concat(data);
      this.expenses_list = this.all_expenses_raw;
      this.makeExpensesUnique();
      this.spinner = false;
    });
  }

  getBasketSum(){
    let s = 0;
    let currency = '';
    this.basket.forEach(element => {
      s += element.Price;
      currency = element.Currency;
    });
    return s + ' ' + currency
  }

  deleteItemFromBasket(item){
    this.basket = this.basket.filter((obj) => {
      return obj !== item;
    });
  }

  deleteFromField(item){
    if(['Category', 'Subcategory', 'Product', 'Price', 'Currency'].includes(item.name)){
      window.alert('Cannot delete standard products');
      return
    }
    this.fields = this.fields.filter((obj) => {
      return obj !== item;
    });

    let group={}    
    this.fields.forEach(element=>{
      group[element.name] = new FormControl(this.newItemForm.value[element.name], Validators.required);  
    })

    this.newItemForm = new FormGroup(group);
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

  getItemProperties(item) {
    return Object.getOwnPropertyNames(item).filter((x) => !['Product', 'Category', 'Subcategory', 'Price', 'Currency'].includes(x))
  }

  addToBasket(item){
    this.basket.push(item);    
  }

  showFinalForm() {
    this.show_final_form = true;
    this.show_add_form = false;
    this.show_list_add = false;
  }

  showAddForm(){
    this.show_final_form = false;
    this.show_add_form = true;
    this.show_list_add = false;  
  }

  showListAdd(){
    this.show_final_form = false;
    this.show_add_form = false;
    this.show_list_add = true;    
  }

  addField(){
    this.fields.push({name: this.newFieldName.value, type: this.newFieldType.value});    

    let group={}    
    this.fields.forEach(element=>{
      group[element.name] = new FormControl(this.newItemForm.value[element.name], Validators.required);  
    })

    this.newItemForm = new FormGroup(group);
  }

  try_to_convert(value: any){
    // try to convert to number with comma-dot transformation
    var value_dots = value.replace(',', '.');
    if(!isNaN(+value_dots)){
      return +value_dots;
    }
    // return if value is a string
    return value;
  }

  addNewToBasket(){
    var data = {}
    Object.keys(this.newItemForm.value).forEach(key => {
        data[key] = this.try_to_convert(this.newItemForm.value[key]);
    });
    this.basket.push(data);
  }

  submit_items() {
    this.basket.forEach(element => {
      let newObj = element;
      newObj['Location'] = this.basketForm.value.Location;
      newObj['Vendor Type'] = this.basketForm.value.VendorType;
      newObj['Vendor'] = this.basketForm.value.Vendor;
      newObj['Date'] = this.basketForm.value.Date;
      newObj['Payment Method'] = this.basketForm.value.PaymentMethod;
      this.bs.addOneDoc(newObj, 'expenses');
    });
  }
}
