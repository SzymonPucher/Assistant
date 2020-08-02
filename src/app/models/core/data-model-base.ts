import Utils from '../../layout/shared/utils';
import { FieldSpec } from '../field-spec';

export class DataModelBase {
    
    protected key: string;
    public otherProperties: any;

    constructor(data: any, key: string) {
        this.key = key;
        this.otherProperties = Utils.removeManyProperties(
            data, 
            this.getRequiredKeys()
        );    
    }

    protected getRequiredKeys(): Array<string> {
        return Object.keys(this).filter(obj => obj !== 'key' && obj !== 'otherProperties');
    }

    public getHash() {
        return JSON.stringify(this);
    }

    public getKey() {
        if (this.key == null) {
            throw new Error('Key is null!');
        }
        return this.key;
    }

    public getFieldSpecs(): Array<FieldSpec> {
        let fieldSpecArray = [];
        
        this.getRequiredKeys().forEach(key => {
            fieldSpecArray.push(new FieldSpec(key, Utils.getTypeBasedOnData(this[key]), this[key]));
        });
        
        Object.keys(this.otherProperties).forEach((key) => {
            fieldSpecArray.push(
                new FieldSpec(key, Utils.getTypeBasedOnData(this.otherProperties[key]), this.otherProperties[key]));
        });
        
        return fieldSpecArray;
    }

    public toDto() {
        let dtoObj = this.otherProperties;
        this.getRequiredKeys().forEach(key => {
            dtoObj[key] = this[key];
        });
        return dtoObj;
    }
}