import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from 'src/app/services/budget.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-universal-simple-form',
  templateUrl: './universal-simple-form.component.html',
  styleUrls: ['./universal-simple-form.component.scss']
})
export class UniversalSimpleFormComponent implements OnInit {

  @Input('fields')
  fields: Array<any>;
  
  @Input('doc_path')
  doc_path: string;

  @Input('update_key')
  update_key: string;

  simpleForm: FormGroup;
  newFieldName: FormControl;
  newFieldType: FormControl;

  allowedFieldTypes: Array<string>;
  fieldTypeMap: Map<string, string>;
  
  countAdded: number;
  

  constructor(public bs: BaseService) {
    this.newFieldName = new FormControl('', Validators.required);
    this.newFieldType = new FormControl('', Validators.required);
    this.countAdded = 0;
    this.allowedFieldTypes = ['text', 'number', 'date']
    this.fieldTypeMap = new Map();
   }

   ngOnInit(){
    let group={}    
    
    this.fields.forEach(element=>{
      group[element.name] = new FormControl(element.value ? element.value : '', Validators.required); 
      this.fieldTypeMap.set(element.name, element.type);
    })

    this.simpleForm = new FormGroup(group);
  }

  getFormKeys() {    
    return Object.keys(this.simpleForm.value);
  }

  getFieldType(key: string) {
    return this.fieldTypeMap.get(key);
  }

  addFormField() {
    this.fieldTypeMap.set(this.newFieldName.value, this.newFieldType.value);
    this.simpleForm.addControl(this.newFieldName.value, new FormControl('', Validators.required));
  }

  deleteFormField(fieldName){
    this.fieldTypeMap.delete(fieldName);
    this.simpleForm.removeControl(fieldName);    
  }

  onSubmit() {
    const data = this.simpleForm.value;
    
    if (this.update_key)  {
      this.bs.updateOneDoc(data, this.doc_path + '/' + this.update_key);
    }
    else {
      this.bs.addOneDoc(data, this.doc_path);
      this.countAdded += 1;
    }
  }

}
