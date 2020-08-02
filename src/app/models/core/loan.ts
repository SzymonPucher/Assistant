import { DataModelBase } from './data-model-base';
import Utils from 'src/app/layout/shared/utils';

export class Loan extends DataModelBase {
    
    public lender: string;
    public borrower: string;
    public amount: number;
    public currency: string;
    public account: string;
    public start: string;
    public due: string;
    public description: string;

    constructor(data: any, key: string = null) {
        super(data, key);
        this.lender = data.lender;
        this.borrower = data.borrower;
        this.amount = data.amount;
        this.currency = data.currency;
        this.account = data.account;
        this.start = data.start;
        this.due = data.due;
        this.description = data.description;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );
    }
}