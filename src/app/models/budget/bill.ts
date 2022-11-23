import Utils from "src/app/layout/shared/utils";
import { DataModelBase } from "../core/data-model-base";

export class Bill extends DataModelBase {
    
    public key: string;
    public date: string;
    public vendor: string;
    public location: string;
    public payment_method: string;
    public price: number;
    public currency: string;

    constructor(data: any, key: string = null) {
        super(data, key);
        this.key = key;
        this.date = data.date;
        this.vendor = data.vendor;
        this.location = data.location;
        this.payment_method = data.payment_method
        this.price = data.price;
        this.currency = data.currency;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );
    }

    public static createFromProps(date, vendor, location, payment_method, price, currency, key = null): Bill {
        return new Bill({date, vendor, location, payment_method, price, currency}, key);
    }

    public getDisplayValue(): string {
        return `${this.date} - ${this.vendor} - ${this.getPriceWithCurrency()}`
    }

    public getPriceWithCurrency(): string {
        return `${this.price} ${this.currency}`
    }
}