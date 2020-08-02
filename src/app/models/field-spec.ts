import { FieldType } from './field-type';

export class FieldSpec {
    
    name: string;
    type: FieldType;
    value: any;

    constructor(name: string, type: FieldType, value: any = null) {
        this.name = name.toLowerCase();
        this.type = type;
        this.value = value;
    }
}