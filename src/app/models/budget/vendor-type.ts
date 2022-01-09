export class VendorType {
    
    
    public id: number;
    public name: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
    }

    public static createFromProps(id: number, name: string) {
        return new VendorType({id, name});
    }

    public getDisplayValue() {
        return `${this.id} - ${this.name}`
    }
}