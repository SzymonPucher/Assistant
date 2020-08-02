import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';

@Component({
  selector: 'app-add-field-to-form',
  templateUrl: './add-field-to-form.component.html',
  styleUrls: ['./add-field-to-form.component.scss']
})
export class AddFieldToFormComponent {

  @Output()
  submitClicked: EventEmitter<FieldSpec> = new EventEmitter<FieldSpec>();

  addFieldForm: FormGroup;
  allowedFieldTypes: Array<string>;

  constructor() {
    this.allowedFieldTypes = Object.keys(FieldType);

    this.addFieldForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl(FieldType.text, Validators.required)
    });
  }

  public onSubmit() {
    const formData = this.addFieldForm.value;
    const fieldConfig = new FieldSpec(formData.name.toLowerCase().replace(' ', '_'), formData.type);
    this.submitClicked.emit(fieldConfig);
  }
}
