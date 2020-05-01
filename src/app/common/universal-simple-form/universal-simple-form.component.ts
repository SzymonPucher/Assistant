import { Component, Input, OnChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-universal-simple-form',
  templateUrl: './universal-simple-form.component.html',
  styleUrls: ['./universal-simple-form.component.scss']
})
export class UniversalSimpleFormComponent implements OnChanges {

  @Input('fields')
  fields: Array<any>;
  
  @Input('doc_path')
  doc_path: string;

  @Input('update_key')
  update_key: string;


  simpleForm: FormGroup;
  newFieldName: FormControl;
  newFieldType: FormControl;
  
  fieldTypes: Array<string>;
  
  countAdded: number;
  

  constructor(public db: AngularFireDatabase) {
    this.newFieldName = new FormControl('', Validators.required);
    this.newFieldType = new FormControl('', Validators.required);
    this.countAdded = 0;
    this.fieldTypes = ['text', 'number', 'date']
   }

   ngOnChanges(){
      this.updateForm();      
   }

  updateForm(){
    let group={}    
    this.fields.forEach(element=>{
      group[element.name] = new FormControl(element.value ? element.value : '', Validators.required);  
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
    let data = {}
    
    Object.keys(this.simpleForm.value).forEach(key => {
        data[key] = this.try_to_convert(this.simpleForm.value[key].toString());
    });

    if (this.update_key)  {
      this.db.object(this.doc_path + '/' + this.update_key).update(data);
    }
    else {
      this.db.list(this.doc_path).push(data);
      this.countAdded += 1;
    }

  }

}
