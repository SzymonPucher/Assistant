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
        this.vendor = typeof data.vendor === 'string' ? data.vendor : 'Could not parse.';
        this.location = typeof data.location === 'string' ? data.location : 'Could not parse.';
        this.payment_method = typeof data.payment_method === 'string' ? data.payment_method : 'Could not parse.';
        this.currency = typeof data.currency === 'string' ? data.currency : 'Could not parse.';
        this.price = data.price;
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

    public getVendorLimited(limit: number) {
        try {
            if (this.vendor.length <= limit) {
                return this.vendor;
            }
            return this.vendor.substring(0, limit) + '...';
        }
        catch {
            console.log('Problems parsing', this);
            return 'Unknown';
        }
    }
}