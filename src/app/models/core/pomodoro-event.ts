import { DataModelBase } from './data-model-base';
import Utils from 'src/app/layout/shared/utils';

export class PomodoroEvent extends DataModelBase {
    
    catergory: string;
    name: string;
    start: string;
    duration: number;

    constructor (data: any, key: string = null){
        super(data, key);
        this.catergory = data.category;
        this.name = data.name;
        this.start = data.start;
        this.duration = data.duration;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );
    }

    public getHash() {
        let new_obj = this;
        delete new_obj.start;
        return JSON.stringify(new_obj);
    }
}