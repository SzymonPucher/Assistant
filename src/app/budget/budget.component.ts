import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  itemValue = '';
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
  }


  onSubmit() {
    var fields = document.getElementsByClassName('column')
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
    input1.value = label;
    var input2 = document.createElement('input');
    input2.type = 'text';
    input2.placeholder = 'value';
    input2.value = value;
    var element = document.createElement('div');
    element.appendChild(input1);
    element.appendChild(input2);
    element.className = 'column';
    document.getElementById('aform').insertBefore(element, document.getElementById('sbmbtn'));
  }

  deleteFormField(id){
    var formField = document.getElementById(id).parentElement;
    formField.parentNode.removeChild(formField);
  }
}
