export class MenuIconButton {
    
    iconName: string;
    routerLink: string;
    color: string;

    constructor (iconName: string, routerLink: string = null, color: string = ''){
        this.iconName = iconName;
        this.routerLink = routerLink;
        this.color = color;
    }
}