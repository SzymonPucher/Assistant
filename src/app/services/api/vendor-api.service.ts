import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from "../../../environments/environment";
import { vendorsStub, vendorTypesStub } from "src/app/services/api/stubs/budget.stubs"
import { AuthService } from './auth.service';
import { Vendor } from 'src/app/models/budget/vendor';
import { BaseDataApiService } from './base-data-api.service';
import { VendorType } from 'src/app/models/budget/vendor-type';

@Injectable({
    providedIn: 'root'
})
export class VendorApiService extends BaseDataApiService {

    vendorsSubPath: string = 'budget/vendors';
    vendorTypesSubPath: string = 'budget/vendor_types';

    constructor(public db: AngularFireDatabase, public auth: AuthService) {
        super(db, auth);
    }

    // get

    public getVendors() {
        if (!environment.production) {
            return of(vendorsStub);
        }
        return this.getList(this.vendorsSubPath).pipe(map(data => data.map(item => new Vendor(item))));
    }

    public getVendorsWithKeys() {
        if (!environment.production) {
            return of(vendorTypesStub);
        }
        return this.getListWithKeys(this.vendorTypesSubPath).pipe(map(data => data.map(item => new Vendor(item.payload.val()))));;
    }

    public getVendorTypes() {
        if (!environment.production) {
            return of(vendorTypesStub);
        }
        return this.getList(this.vendorsSubPath).pipe(map(data => data.map(item => new VendorType(item))));
    }

    // add

    public addVendor(data: any) {
        if (!environment.production) {
            return null;
        }
        this.addOneDoc(data, this.vendorsSubPath);
    }

    public addVendorType(data: any) {
        if (!environment.production) {
            //return null;
        }
        this.addOneDoc(data, this.vendorTypesSubPath);
    }

    //update

    public updateVendor(data: any, update_key: string) {
        if (!environment.production) {
            return null;
        }
        const path = this.vendorsSubPath + '/' + update_key
        return this.updateOneDoc(data, path);
    }

    public updateVendorType(data: any, update_key: string) {
        if (!environment.production) {
            return null;
        }
        const path = this.vendorTypesSubPath + '/' + update_key
        return this.updateOneDoc(data, path);
    }

    // remove

    public removeVendor(key: string) {
        if (!environment.production) {
            return null;
        }
        return this.removeOneDoc(this.vendorsSubPath + '/' + key);
    }

    public removeVendorType(key: string) {
        if (!environment.production) {
            return null;
        }
        return this.removeOneDoc(this.vendorTypesSubPath + '/' + key);
    }
}
