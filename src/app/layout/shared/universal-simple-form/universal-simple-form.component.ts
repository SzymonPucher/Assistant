import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';

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

  @Input('is_hiddable')
  is_hiddable: boolean;

  @Output()
  submitClicked: EventEmitter<any> = new EventEmitter<any>();
  
  simpleForm: FormGroup;
  fieldTypeMap: Map<string, string>;
  
  countAdded: number; 
  is_hidden: boolean;

  constructor() {
    this.countAdded = 0;
    this.fieldTypeMap = new Map();
    this.simpleForm = new FormGroup({});  
  }

  ngOnInit(){
    this.fields.forEach(field=> this.addFormField(field));
    this.is_hidden = this.is_hiddable;
    this.show_add_field_form = this.show_add_field_form === undefined ? true : false;
  }

  getFormKeys(): Array<string> {
    return Object.keys(this.simpleForm.value);
  }

  getFieldType(fieldName: string): string {
    return this.fieldTypeMap.get(fieldName);
  }

  isTextArea(fieldName: string): boolean {
    return this.getFieldType(fieldName) === FieldType.textarea;
  }

  getReadibleFieldName(fieldName: string): string {
    return fieldName.replace('_', ' ')
  }

  updateField() {
    for (let i = 0; i < this.fields.length; i++) {
      this.fields[i].value = this.simpleForm.value[this.fields[i].name];
    }
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
    const obj = {};
    this.getFormKeys().forEach(key => {
      obj[key] = this.simpleForm.value[key];
    });
    this.submitClicked.emit(obj);
  }

  toggle() {
    this.is_hidden = !this.is_hidden;
  }
}
