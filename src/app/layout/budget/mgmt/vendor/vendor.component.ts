import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/budget/vendor';
import { BudgetApiService } from 'src/app/services/api/budget-api.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendors: Vendor[];

  constructor(public budgetApiService: BudgetApiService) { }

  ngOnInit(): void {
    this.budgetApiService.getVendors().subscribe(v => this.vendors = v);
  }

}
