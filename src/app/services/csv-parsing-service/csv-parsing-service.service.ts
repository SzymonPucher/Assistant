import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvParsingServiceService {

  constructor() { }

  parseCsv(content: string, delimiter: string): any {
    let parsedContent = content.split('\n').map(e => e.split(delimiter));


    const common_elements = {};

    for (const e of parsedContent)   {
      let element = e.length;
      if (common_elements[element]) {
        common_elements[element] += 1;
      } else {
        common_elements[element] = 1;
      }
    }
    
    let max_count = parseInt(Object.keys(common_elements).reduce((a, b) => common_elements[a] > common_elements[b] ? a : b));

    return parsedContent.filter(x => x.length === max_count);
  }
}