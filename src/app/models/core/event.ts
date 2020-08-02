import { DataModelBase } from './data-model-base';
import Utils from 'src/app/layout/shared/utils';

export class Event extends DataModelBase {
    
    public name: string;
    public start: string;
    public finish: string;

    constructor(data: any, key: string = null) {
        super(data, key);
        this.name = data.name;
        this.start = data.start;
        this.finish = data.finish;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );
    }
}