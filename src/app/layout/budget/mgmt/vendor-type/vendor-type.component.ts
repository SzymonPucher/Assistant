import { Component, OnInit } from '@angular/core';
import { VendorType } from 'src/app/models/budget/vendor-type';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';
import { VendorApiService } from 'src/app/services/api/vendor-api.service';

@Component({
  selector: 'app-vendor-type',
  templateUrl: './vendor-type.component.html',
  styleUrls: ['./vendor-type.component.scss']
})
export class VendorTypeComponent implements OnInit {

  formFields: FieldSpec[];
  vendorTypes: VendorType[];

  constructor(public vendorApiService: VendorApiService) { 
    this.formFields = [
      new FieldSpec('id', FieldType.number),
      new FieldSpec('name', FieldType.text)
    ]
  }

  ngOnInit(): void {
    this.vendorApiService.getVendorTypes().subscribe(value => this.vendorTypes = value);
  }

  public onSubmitForm(data: any): void {
    var vendorType = new VendorType(data);
    console.log(vendorType);
    
    this.vendorApiService.addVendorType(vendorType);
  }

  public editVendorType(data: VendorType): void {
    this.formFields = [
      new FieldSpec('id', FieldType.number, data.id),
      new FieldSpec('name', FieldType.text, data.name)
    ]
  }

  public deleteVendorType(data: VendorType): void {
    this.vendorApiService.removeVendorType(data.id);
  }
}
