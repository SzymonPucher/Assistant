export default class Utils {
  
  public static try_to_convert(value: string){
    value = value.toString();
    
    // try to convert to number with comma-dot transformation
    var value_dots = value.replace(',', '.');
    
    if(!isNaN(+value_dots)){
      return +value_dots;
    }

    // return if value is not a valid number
    return value;
  }

  public static round(num: number, q: number) {
    let quantifier = q != 0 ? 10**q : 1;

    return Math.round(num * quantifier) / quantifier;
  }

}
