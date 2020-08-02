import { Component, Input, OnInit, Output, EventEmitter, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldSpec } from 'src/app/models/field-spec';

@Component({
  selector: 'app-universal-simple-form',
  templateUrl: './universal-simple-form.component.html',
  styleUrls: ['./universal-simple-form.component.scss']
})
export class UniversalSimpleFormComponent implements OnInit {

  @Input('fields')
  fields: Array<FieldSpec>;

  @Input('show_add_field_form')
  show_add_field_form: boolean;

  @Output()
  submitClicked: EventEmitter<any> = new EventEmitter<any>();
  
  simpleForm: FormGroup;
  fieldTypeMap: Map<string, string>;
  
  countAdded: number;

  constructor() {
    this.countAdded = 0;
    this.fieldTypeMap = new Map();
    this.simpleForm = new FormGroup({});
    this.show_add_field_form = this.show_add_field_form === undefined ? true : false;
  }

   ngOnInit(){
    this.fields.forEach(field=> this.addFormField(field));    
  }

  getFormKeys(): Array<string> {    
    return Object.keys(this.simpleForm.value);
  }

  getFieldType(key: string): string {
    return this.fieldTypeMap.get(key);
  }

  isTextArea(fieldName: string): boolean {
    return this.getFieldType(fieldName) === 'textarea';
  }

  getReadibleFieldName(fieldName: string): string {
    return fieldName.replace('_', ' ')
  }

  addFormField(data: FieldSpec): void {
    this.fieldTypeMap.set(data.name, data.type);
    this.simpleForm.addControl(data.name, new FormControl(data.value, Validators.required));    
  }

  deleteFormField(fieldName: string): void {
    this.fieldTypeMap.delete(fieldName);
    this.simpleForm.removeControl(fieldName);    
  }

  onSubmit(): void {    
    this.submitClicked.emit(this.simpleForm.value);
    this.fields.forEach(field=> this.addFormField(field));
    }
}
