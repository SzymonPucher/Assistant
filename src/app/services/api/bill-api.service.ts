import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from "../../../environments/environment";
import { billsStub } from "src/app/services/api/stubs/budget.stubs"
import { AuthService } from './auth.service';
import { Bill } from 'src/app/models/budget/bill';
import { BaseDataApiService } from './base-data-api.service';

@Injectable({
    providedIn: 'root'
})
export class BillApiService extends BaseDataApiService {

    billsSubPath: string = 'budget/bills';

    constructor(public db: AngularFireDatabase, public auth: AuthService) {
        super(db, auth);
    }

    // get
    public getBills() {
        return of(billsStub);
        return this.getList(this.billsSubPath).pipe(map(data => data.map(item => new Bill(item))));
    }

    public getBillsWithKeys() {
        return of(billsStub);
        return this.getListWithKeys(this.billsSubPath).pipe(map(data => data.map(item => new Bill(item.payload.val(), item.payload.key))));;
    }

    // add
    public addBill(data: any) {
        this.addOneDoc(data, this.billsSubPath);
    }

    //update
    public updateBill(data: any, update_key: number) {
        if (!environment.production) {
            return null;
        }
        const path = this.billsSubPath + '/' + update_key
        return this.updateOneDoc(data, path);
    }

    // remove
    public removeBill(key: string) {
        return this.removeOneDoc(this.billsSubPath + '/' + key);
    }
}
