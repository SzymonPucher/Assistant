import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budget-innertransfer-add',
  templateUrl: './budget-innertransfer-add.component.html',
  styleUrls: ['./budget-innertransfer-add.component.scss']
})
export class BudgetInnertransferAddComponent implements OnInit {

  incomes: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.incomes = db.list('innertransfers').valueChanges();
  }

  ngOnInit(){
    this.addSuggestions();
  }

  addSuggestions(){
    var fields = {'Source': Array(), 'Source currency': Array(), 'Destination': Array(), 'Destination currency': Array(), 'Reason': Array()}
    this.incomes.subscribe(res => {
      res.forEach(income => {
        Object.keys(fields).forEach(key => {
          if(!fields[key].includes(income[key])){
            fields[key].push(income[key]);
            this.addSuggestion(key, income[key]);
          }
        }); 
      });
    });
  }

  addSuggestion(field, value){
    var sugg_box = document.getElementById(field).getElementsByClassName('suggestions')[0];
    var sf = document.createElement('div');
    sf.innerHTML = value;
    sf.onclick = function(){
      sugg_box.parentElement.getElementsByTagName('input')[0].value = value;
    }
    sf.className = 'field_suggestion';
    sugg_box.appendChild(sf);
  }

  onSubmit() {
    var inputs = document.getElementsByTagName('input');
    var labels = ['Date', 'Source', 'Source amount', 'Source currency', 'Destination', 'Destination amount', 'Destination currency', 'Reason']
    if(inputs.length != labels.length){
      alert('Incorrect number of inputs!');
      return;
    }
    var data = {}
    for (var i = 0; i < labels.length; i++) {
      data[labels[i]] = inputs[i].value 
    }
    this.db.list('innertransfers').push(data);
  }

}
