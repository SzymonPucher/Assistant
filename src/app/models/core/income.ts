import { DataModelBase } from './data-model-base';
import Utils from 'src/app/layout/shared/utils';

export class Income extends DataModelBase {
    
    public date: string;
    public source: string;
    public destination: string;
    public amount: number;
    public currency: string;

    constructor(data: any, key: string = null) {
        super(data, key);
        this.date = data.date;
        this.source = data.source;
        this.destination = data.destination;
        this.amount = data.amount;
        this.currency = data.currency;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );
    }
}