export default class Utils {
  
  static try_to_convert(value: string){
    value = value.toString();
    // try to convert to number with comma-dot transformation
    var value_dots = value.replace(',', '.');
    if(!isNaN(+value_dots)){
      return +value_dots;
    }
    // return if value is a string
    return value;
  }

}
