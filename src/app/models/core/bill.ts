import { DataModelBase } from './data-model-base';
import Utils from 'src/app/layout/shared/utils';
import { Expense } from './expense';

export class Bill2 extends DataModelBase {

    public currency: string;
    public date: string;
    public payment_method: string;
    public vendor: string;
    public vendor_type: string;
    public location: number;
    public expenses: ExpenseShort[];

    constructor(data: any, key: string = null) {
        super(data, key);
        this.currency = data.currency;
        this.date = data.date;
        this.payment_method = data.payment_method;
        this.vendor = data.vendor;
        this.vendor_type = data.vendor_type;
        this.location = data.location;
        this.expenses = data.expenses;
        this.otherProperties = Utils.removeManyProperties(
            data,
            this.getRequiredKeys()
        );
    }

    public getExpensesUnnested(): Expense[] {
        return this.expenses.map(x => x.getUnnestedExpense(this.currency, this.date, this.payment_method, this.vendor, this.vendor_type, this.location, this.otherProperties));
    }
}

export class ExpenseShort extends DataModelBase {

    public product: string;
    public subcategory: string;
    public category: string;
    public price: number;

    constructor(data: any, key: string = null) {
        super(data, key);
        this.product = data.product;
        this.subcategory = data.subcategory;
        this.category = data.category;
        this.price = +data.price;
        this.otherProperties = Utils.removeManyProperties(
            data,
            this.getRequiredKeys()
        );
    }

    public getHash(full = false) {
        if (full) {
            return JSON.stringify(this);
        }
        let newObj = {
            category: this.category,
            subcategory: this.subcategory,
            product: this.product,
            price: this.price
        }
        Object.keys(this.otherProperties).forEach(key => {
            newObj[key] = this.otherProperties[key]
        });
        return JSON.stringify(newObj);
    }

    public getUnnestedExpense(currency, date, payment_method, vendor, vendor_type, location, otherProperties): Expense {
        return null;
    }
}