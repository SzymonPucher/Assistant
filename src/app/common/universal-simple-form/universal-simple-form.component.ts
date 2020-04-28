import { Component, ViewChildren, QueryList, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-universal-simple-form',
  templateUrl: './universal-simple-form.component.html',
  styleUrls: ['./universal-simple-form.component.scss']
})
export class UniversalSimpleFormComponent implements OnInit {

  @Input('fields')
  fields: Array<any>;

  countAdded: number;

  fieldTypes: Array<string>;

  simpleForm: FormGroup;

  newFieldName = new FormControl('', Validators.required);
  newFieldType = new FormControl('', Validators.required);
  
  @Input('doc_path')
  doc_path: string;

  constructor(public db: AngularFireDatabase) {
    this.countAdded = 0;
    this.fieldTypes = ['text', 'number', 'date']

   }

   ngOnInit(){
    
    let group={}    
    this.fields.forEach(element=>{
      group[element.name] = new FormControl('', Validators.required);  
    })

    this.simpleForm = new FormGroup(group);
   }

  updateForm(){
    let group={}    
    this.fields.forEach(element=>{
      group[element.name] = new FormControl(this.simpleForm.value[element.name], Validators.required);  
    })

    this.simpleForm = new FormGroup(group);
  }

  addFormField() {
    this.fields.push({name: this.newFieldName.value, type: this.newFieldType.value});    
    this.updateForm();
  }

  deleteFormField(item){
    this.fields = this.fields.filter((obj) => {
      return obj !== item;
    });
    this.updateForm();
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
    Object.keys(this.simpleForm.value).forEach(key => {
        data[key] = this.try_to_convert(this.simpleForm.value[key]);
    });
    this.db.list(this.doc_path).push(data);
    this.countAdded += 1;
  }
}
