import { DataModelBase } from './data-model-base';
import Utils from 'src/app/layout/shared/utils';
import { FieldSpec } from '../field-spec';

export class Expense extends DataModelBase {
    
    public product: string;
    public subcategory: string;
    public category: string;
    public price: number;
    public currency: string;
    public date: string;
    public payment_method: string;
    public vendor: string;
    public vendor_type: string;
    public location: number;

    constructor(data: any, key: string = null) {
        super(data, key);
        this.product = data.product;
        this.subcategory = data.subcategory;
        this.category = data.category;
        this.price = data.price;
        this.currency = data.currency;
        this.date = data.date;
        this.payment_method = data.payment_method;
        this.vendor = data.vendor;
        this.vendor_type = data.vendor_type;
        this.location = data.location;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );
    }

    public getHash() {
        let newObj = {
            category: this.category,
            subcategory: this.subcategory,
            product: this.product,
            price: this.price,
            currency: this.currency
        }
        Object.keys(this.otherProperties).forEach(key => {
            newObj[key] = this.otherProperties[key]
        });
        return JSON.stringify(newObj);
    }

    public getGenericFieldSpecs() {
        const nonGenericFields = ['date', 'payment_method', 'vendor', 'vendor_type', 'location']
        const allFieldSpecs =  this.getFieldSpecs();
        return allFieldSpecs.filter((field: FieldSpec) => !nonGenericFields.includes(field.name));
    }

    public replaceGroupingFields(data: any){
        this.location = data.location;
        this.vendor_type = data.vendor_type;
        this.vendor = data.vendor;
        this.date = data.date;
        this.payment_method = data.payment_method;  
    }
}