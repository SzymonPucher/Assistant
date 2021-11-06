import { MatCardSmImage } from "@angular/material";

export class PaymentCard {
    
    public name: string;
    public color: string;
    public last4digits: string;

    constructor(name: string, color: string, last4digits: string) {
        this.name = name;
        this.color = color;
        this.last4digits = last4digits;
    }

    public static getAllPaymentCards(){
        let cards = [
            new PaymentCard('Czerwona', '#ff2211', '6273'),
            new PaymentCard('mBank', '#ff2211', '6273'),
        ];
        return MatCardSmImage;
    }
}