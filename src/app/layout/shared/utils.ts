import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';

export default class Utils {

  public static tryToConvert(value: string): string | number {
    value = value.toString();

    // try to convert to number with comma-dot transformation
    var value_dots = value.replace(',', '.');

    if (!isNaN(+value_dots)) {
      return +value_dots;
    }

    // return if value is not a valid number
    return value;
  }

  public static round(num: number, q: number) {
    let quantifier = q != 0 ? 10 ** q : 1;
    return Math.round(num * quantifier) / quantifier;
  }

  public static getIsoDateString(d: Date) {
    return `${d.getFullYear()}-${d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`;
  }

  public static sortByProperty(array: Array<object>, property: string, reverse: boolean = false): Array<any> {
    array.sort((a,b) => (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0));
    
    if(reverse) {
      array = array.reverse();
    }

    return array;
  }

  public static removeProperty(obj: object, property: any){
    if (Object.keys(obj).includes(property)) {
      delete obj[property]
    }
    return obj
  }

  public static removeManyProperties(obj: object, properties: any[]){
    properties.forEach(property => {
      obj = this.removeProperty(obj, property);
    });
    return obj;
  }

  public static getTypeBasedOnData(obj: any): FieldType {
    if (typeof obj === 'number') {
      return FieldType.number;
    }

    if (obj instanceof Date) {
      return FieldType.date;
    }
    
    if (obj !== Utils.tryToConvert(obj)){
      return FieldType.number;
    }
    
    let regex = new RegExp('/(\d{4})-(\d{2})-(\d{2})/')
    if (regex.test(obj)){
      return FieldType.date;
    }

    if (obj.length > 50) {
      return FieldType.textarea;
    }

    return FieldType.text;
  }

  public static sumByProperty(array: Array<object>, property: string, round: number = null) {
    let sum = array.map(obj => obj[property]).reduce((a, b) => a + b, 0);
    if(round) {
      sum = Utils.round(sum, round);
    }
    return sum;
  }

  public static strInStr(innerStr: string, outerStr: string, caseSensitive: boolean = false): boolean {
    if (!caseSensitive) {
      outerStr = outerStr.toLowerCase();
      innerStr = innerStr.toLowerCase();
    }
    return outerStr.includes(innerStr);
  }
}
