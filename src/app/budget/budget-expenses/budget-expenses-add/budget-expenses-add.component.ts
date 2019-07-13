import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budget-expenses-add',
  templateUrl: './budget-expenses-add.component.html',
  styleUrls: ['./budget-expenses-add.component.sass']
})
export class BudgetExpensesAddComponent implements OnInit {

  itemValue = Array();
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    var today = new Date()
    var date_str = (today.getFullYear()-1).toString() + '-' + today.getMonth().toString() + '-' + today.getDate().toString()
    this.items = db.list('spendings', ref => ref.orderByChild('Date').startAt(date_str)).valueChanges();
  }

  ngOnInit(){
    var fields = ['Product', 'Category', 'Subcategory', 'Price', 'Currency', 'Payment Method', 'Date', 'Vendor' ,'Vendor Type', 'Location']
    fields.forEach(element => {
      this.addFormField(element);
    });
    console.log('begin')
    this.items.subscribe(res => this.createFormFields(res));
    console.log(this.itemValue);
    console.log('end')
  }

  createFormFields(data){
    let arr = Array();
    var pv = this.getFieldValue('Product')
    data.forEach(e => {
      if(e.Product == pv){
        Object.keys(e).forEach(x => {
          if(!arr.includes(x)){
            arr.push(x);
          }
        })
      }
    });
    console.log(arr);
  }

  getFormAsJSON(nonEmpty=false){
    var fields = document.getElementsByClassName('row')
    var dict = {}
    for (var i = 0; i < fields.length; i++) {
      var inputs = fields[i].getElementsByTagName('input');
      if(nonEmpty && inputs[1].value.length == 0){
        continue;
      }
      dict[inputs[0].value] = inputs[1].value;
    }
    return dict;
  }

  createFieldOptions(data, fieldName){
    let arr = Array();
    var prod_val = this.getFieldValue('Product');
    var form = this.getFormAsJSON(true);
    data.forEach(e => {
      var x = e[fieldName]
      if(!arr.includes(x)){
        if(this.isFormMatched(form, e)){
          arr.push(x);
        }
      }
    });
    console.log(arr);
    return arr;
  }

  isFormMatched(form, dbField){
    var is_matched = true;
    if(Object.keys(form).length == 0){
      return false;
    }
    Object.keys(form).forEach(x => {
      if(dbField[x] != form[x]){
        // return does not work here, since it returns our of 
        is_matched = false;
        return
      }
      console.log(dbField[x], '==', form[x]);
    })
    console.log('form', form, 'dbField', dbField);
    return is_matched;
  }

  getExistingFieldLabels(){
    var fields = document.getElementsByClassName('row')
    var res = Array();
    for (var i = 0; i < fields.length; i++) {
      var inputs = fields[i].getElementsByTagName('input')
      res.push(inputs[0].value);
    }
    return res
  }

  addSuggetions(suggetions, fieldName){
    var field_to_append_into = this.getField(fieldName)

    var sugg_box = field_to_append_into.getElementsByClassName('suggestions')[0];

    while(sugg_box.firstChild) {
      sugg_box.removeChild(sugg_box.firstChild);
    }
    if(suggetions.length == 1){
      field_to_append_into.getElementsByTagName('input')[1].value = suggetions[0]
      return
    }
    suggetions.forEach(sugg => {
      var sf = document.createElement('div');
      sf.innerHTML = sugg;
      sf.className = 'field_suggestion';
      sugg_box.appendChild(sf);
    });
    console.log(sugg_box)
  }

  clk(){
    console.log('Run clk');
    var form = this.getFormAsJSON();
    this.items.subscribe(res => {
      Object.keys(form).forEach(k => {
        this.addSuggetions(this.createFieldOptions(res, k), k);
      });
    });
  }

  getField(fieldName){
    var fields = document.getElementsByClassName('row')
    var res = null;
    for (var i = 0; i < fields.length; i++) {
      var inputs = fields[i].getElementsByTagName('input')
      if(inputs[0].value == fieldName){
        return fields[i]
      } 
    }
  }

  getFieldValue(fieldName){
    return this.getField(fieldName).getElementsByTagName('input')[1].value;
  }

  onSubmit() {
    var fields = document.getElementsByClassName('row')
    var data = {}
    for (var i = 0; i < fields.length; i++) {
      var inputs = fields[i].getElementsByTagName('input')
      data[inputs[0].value] = inputs[1].value 
    }
    this.db.list('spendings').push(data);
  }

  addFormField(label='', value='') {
    var input1 = document.createElement('input');
    input1.type = 'text';
    input1.placeholder = 'attribute';
    input1.className = 'attribute'
    input1.value = label;
    var input2 = document.createElement('input');
    input2.type = 'text';
    input2.placeholder = 'value';
    input2.className = 'value'
    input2.value = value;
    var suggetions = document.createElement('div');
    suggetions.className = 'suggestions';
    var del = document.createElement('button');
    del.innerHTML = 'del'
    del.className = 'del_button'
    var element = document.createElement('div');
    del.onclick = function(){
      element.parentNode.removeChild(element);
    };
    element.appendChild(input1);
    element.appendChild(input2);
    element.appendChild(del);
    element.appendChild(suggetions);
    element.className = 'row';
    document.getElementById('aform').insertBefore(element, document.getElementById('sbmbtn'));
  }

  deleteFormField(id){
    var formField = document.getElementById(id).parentElement;
    formField.parentNode.removeChild(formField);
  }
}
