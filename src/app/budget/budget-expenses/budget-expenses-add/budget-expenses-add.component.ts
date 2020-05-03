import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import { SuggestionInputComponent } from 'src/app/shared/suggestion-input/suggestion-input.component';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget-expenses-add',
  templateUrl: './budget-expenses-add.component.html',
  styleUrls: ['./budget-expenses-add.component.scss']
})
export class BudgetExpensesAddComponent implements OnInit {

  @ViewChildren(SuggestionInputComponent) sugg_inp_comps: QueryList<SuggestionInputComponent>

  itemValue = Array();
  items: Observable<any[]>;
  fields = Array();

  constructor(public db: AngularFireDatabase, public budgetService: BudgetService) {

    this.items = budgetService.getExpenses();
    this.addFormFields();

  }

  addFormFields(filter_options = undefined) {
    this.items.subscribe(
      (val) => {
        if (filter_options) {
          val = this.filterFieldOptions(val, filter_options);
        }
        if (val.length > 0) {
          this.fields = Object.keys(val[0]);
          val.forEach(dict => {
            this.fields = this.fields.filter(value => Object.keys(dict).includes(value))
          });
        }
      });
  }

  filterFieldOptions(val, filter_options) {
    filter_options.forEach(element => {
      val = val.filter(value => value[element.label] === element.value)
    });
    return val
  }

  ngOnInit() {
  }

  get_sugg_inp_comps() {
    return this.sugg_inp_comps.filter(obj => obj.include);
  }

  get_all_fields_with_values() {
    var fields_with_values = []
    this.get_sugg_inp_comps().forEach(element => {
      if (element) {
        if (element.getValue().length > 0) {
          fields_with_values.push({ label: element.inpLabel, value: element.getValue() })
        }
      }
    });
    return fields_with_values;
  }

  get_all_fields_without_values() {
    var fields_without_values = []
    this.get_sugg_inp_comps().forEach(element => {
      if (element.getValue().length == 0) {
        fields_without_values.push(element)
      }
    });
    return fields_without_values;
  }

  reset_all_suggestions() {
    this.get_sugg_inp_comps().forEach(element => {
      element.resetSuggestions();
    });
  }

  calculate_all_suggestions() {
    var fwv = this.get_all_fields_with_values();
    if (fwv.length == 0) {
      return;
    }
    this.addFormFields(fwv);
    var fwov = this.get_all_fields_without_values();
    this.reset_all_suggestions();
    this.items.subscribe(
      (val) => {
        val.forEach(element => {
          var is_matched = true;


          fwv.forEach(el => {
            if (!Object.keys(element).includes(el.label) || !(element[el.label] === el.value)) {
              is_matched = false;
            }
          });
          if (is_matched) {
            fwov.forEach(el => {
              if (element[el.inpLabel]) {
                el.addSuggestion(element[el.inpLabel]);
              }
            });
          }
        });
        this.get_sugg_inp_comps().forEach(element => {
          if (element.suggs.length == 1) {
            element.setValue(element.suggs[0]);
          }
        });
      });
  }

  addFormField(label_inp = '', type_inp = 'text') {
    this.fields.push({ label: label_inp, type_of_field: type_inp })
  }

  deleteFormField(label) {
    this.fields = this.fields.filter(obj => obj !== label);
  }

  try_to_convert(value){
    if(!isNaN(+value)){
      return +value;
    }
    return value;
  }

  onSubmit() {
    var data = {}
    this.get_sugg_inp_comps().forEach(element => {
      if (element.include) {
        if(element.getValue().length > 0){
          data[element.inpLabel] = this.try_to_convert(element.getValue());
        }
      }
    });
    this.db.list('expenses').push(data);
  }
}
