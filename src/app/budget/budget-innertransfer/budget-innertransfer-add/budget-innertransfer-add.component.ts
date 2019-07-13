import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budget-innertransfer-add',
  templateUrl: './budget-innertransfer-add.component.html',
  styleUrls: ['./budget-innertransfer-add.component.sass']
})
export class BudgetInnertransferAddComponent implements OnInit {

  incomes: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.incomes = db.list('innertransfers').valueChanges();
  }

  ngOnInit(){
    var fields = {'Source': Array(), 'Source currency': Array(), 'Destination': Array(), 'Destination currency': Array()}
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
    var labels = ['Date', 'Source', 'Source amount', 'Source currency', 'Destination', 'Destination amount', 'Destination currency']
    if(inputs.length != 7){
      alert('Incorrect number of inputs!');
      return;
    }
    var data = {}
    for (var i = 0; i < 7; i++) {
      data[labels[i]] = inputs[i].value 
    }
    this.db.list('innertransfers').push(data);
  }

}
