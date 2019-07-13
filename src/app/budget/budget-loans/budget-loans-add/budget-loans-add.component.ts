import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budget-loans-add',
  templateUrl: './budget-loans-add.component.html',
  styleUrls: ['./budget-loans-add.component.sass']
})
export class BudgetLoansAddComponent implements OnInit {

  incomes: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.incomes = db.list('loans').valueChanges();
  }

  ngOnInit(){
    var fields = {'Lender': Array(), 'Borrower': Array(), 'Currency': Array(), 'Account': Array()}
    this.incomes.subscribe(res => {
      res.forEach(income => {
        Object.keys(fields).forEach(key => {
          if(!fields[key].includes(income[key])){
            console.log(key, fields[key], income[key])
            fields[key].push(income[key]);
          }
        }); 
      });
      this.addSuggestions(fields);
    });
  }

  addSuggestions(fields){
    Object.keys(fields).forEach(field => {
      fields[field].forEach(value => {
        this.addSuggestion(field, value);
      });
    });
  }
  
  addSuggestion(field, value){
    var sugg_box = document.getElementById(field).getElementsByClassName('suggestions')[0];
    var sf = document.createElement('div');
    sf.innerHTML = value;
    sf.className = 'field_suggestion';
    sugg_box.appendChild(sf);
  }

  onSubmit() {
    var inputs = document.getElementsByTagName('input');
    var labels = ['Lender', 'Borrower', 'Amount', 'Currency', 'Account', 'Date', 'Due']
    if(inputs.length != labels.length){
      alert('Incorrect number of inputs!');
      return;
    }
    var data = {}
    for (var i = 0; i < labels.length; i++) {
      data[labels[i]] = inputs[i].value 
    }
    this.db.list('loans').push(data);
  }

}
