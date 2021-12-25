export class Vendor {
    
    public id: Number;
    public name: string;
    public typeId: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.typeId = data.typeId;
    }

    public static createFromProps(id, name, typeId): Vendor {
        return new Vendor({id, name, typeId});
    }

    public getDisplayValue() {
        return `${this.id} - ${this.name}`
    }
}