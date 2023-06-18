import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { environment } from "../../../environments/environment";
import { AuthService } from './auth.service';
import { Bill } from 'src/app/models/budget/bill';
import { BaseDataApiService } from './base-data-api.service';

@Injectable({
    providedIn: 'root'
})
export class BillApiService extends BaseDataApiService {

    billsSubPath: string = 'budget/bills';

    private billsSubject: BehaviorSubject<Bill[]>;
    max_key_id: number = 6;

    mockedBills: Bill[] = [
        Bill.createFromProps('2022-08-20', 'Biedronka', 'Wrocław', 'mBank Card', 2.99, 'PLN', 'k1'),
        Bill.createFromProps('2022-08-20', 'Biedronka', 'Wrocław', 'mBank Card', 3.99, 'PLN', 'k2'),
        Bill.createFromProps('2022-08-19', 'Żabka', 'Wrocław', 'Santander RED Card', 2.99, 'PLN', 'k3'),
        Bill.createFromProps('2022-08-19', 'Żabka', 'Wrocław', 'Santander GOLD Card', 8.20, 'PLN', 'k4'),
        Bill.createFromProps('2022-08-21', 'Żabka', 'Mikołów', 'Santander GOLD Card', 8.25, 'PLN', 'k5')
    ];

    constructor(public db: AngularFireDatabase, public auth: AuthService) {
        super(db, auth);
        this.billsSubject = new BehaviorSubject<Bill[]>(this.mockedBills);
    }

    public getBills() {
        // TODO: Move this and other mocked responses to stubbed service which can be injected instead of one that integrates with Firebase.
        if (environment.mockedResponses) {            
            return this.getBillsMocked();
        }
        else {
            return this.getList(this.billsSubPath).pipe(map(data => data.map(item => new Bill(item))));
        }
    }

    public getBillsWithKeys() {
        if (environment.mockedResponses) {
            return this.getBillsWithKeysMocked();
        }
        else {
            return this.getListWithKeys(this.billsSubPath).pipe(
                map(data => data.map(item => new Bill(item.payload.val(), item.payload.key)))
            );

        }
    }

    public addBill(data: any) {
        if (environment.mockedResponses) {
            this.addBillMocked(data);
        }
        else {
            this.addOneDoc(data, this.billsSubPath);
        }
    }

    public updateBill(data: any, update_key: string) {
        if (environment.mockedResponses) {
            this.updateBillMocked(data, update_key);
        }
        else {
            const path = this.billsSubPath + '/' + update_key;
            this.updateOneDoc(data, path);
        }
    }

    public removeBill(key: string) {
        if (environment.mockedResponses) {
            this.removeBillMocked(key);
        }
        else {
            this.removeOneDoc(this.billsSubPath + '/' + key);
        }
    }

    private getBillsMocked(): Observable<Bill[]> {
        return this.billsSubject.asObservable();
    }

    private getBillsWithKeysMocked(): Observable<Bill[]> {
        return this.getBillsMocked();
    }

    private addBillMocked(data: Bill) {
        var bill = new Bill(data, `k${this.max_key_id}`);
        this.max_key_id += 1;
        this.mockedBills.push(bill);
        
        this.billsSubject.next(
            this.mockedBills
        );
    }

    private updateBillMocked(data: Bill, update_key: string) {
        this.removeBillMocked(update_key);
        this.addBill(data);
    }

    private removeBillMocked(key: string) {
        this.mockedBills = this.mockedBills.filter(bill => bill.key != key);
        this.billsSubject.next(
            this.mockedBills
        );
    }
}
