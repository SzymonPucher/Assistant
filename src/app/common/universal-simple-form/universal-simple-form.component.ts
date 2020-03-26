import { Component, ViewChildren, QueryList, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { SuggestionInputComponent } from 'src/app/common/suggestion-input/suggestion-input.component';

@Component({
  selector: 'app-universal-simple-form',
  templateUrl: './universal-simple-form.component.html',
  styleUrls: ['./universal-simple-form.component.scss']
})
export class UniversalSimpleFormComponent {

  @ViewChildren(SuggestionInputComponent) sugg_inp_comps: QueryList<SuggestionInputComponent>

  @Input('fields')
  fields: string[];
  
  @Input('doc_path')
  doc_path: string;

  constructor(public db: AngularFireDatabase) { }

  addFormField(inpLabel: string) {
    this.fields.push(inpLabel);
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

  onSubmit() {
    var data = {}
    this.sugg_inp_comps.filter(obj => obj.include).forEach(element => {
      if (element.include && element.getValue().length > 0) {
        data[element.inpLabel] = this.try_to_convert(element.getValue());
      }
    });
    this.db.list(this.doc_path).push(data);
  }
}
