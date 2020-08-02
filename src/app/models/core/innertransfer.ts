import { DataModelBase } from './data-model-base';
import Utils from 'src/app/layout/shared/utils';

export class InnerTransfer extends DataModelBase {
    
    public date: string;
    public source: string;
    public source_amount: number;
    public source_currency: string;
    public destination: string;
    public destination_amount: number;
    public destination_currency: string;

    constructor(data: any, key: string = null) {
        super(data, key);
        this.date = data.date;
        this.source = data.source;
        this.source_amount = data.source_amount;
        this.source_currency = data.source_currency;
        this.destination = data.destination;
        this.destination_amount = data.destination_amount;
        this.destination_currency = data.destination_currency;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );
    }
}