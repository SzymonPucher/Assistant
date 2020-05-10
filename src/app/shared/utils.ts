export default class Utils {

  public static try_to_convert(value: string) {
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

  public static standard_formatted_date(d: Date) {
    return `${d.getFullYear()}-${d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`;
  }

}
