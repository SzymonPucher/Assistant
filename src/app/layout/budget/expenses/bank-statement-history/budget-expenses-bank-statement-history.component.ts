import { Component, OnInit } from '@angular/core';
import { CsvParsingServiceService } from 'src/app/services/csv-parsing-service/csv-parsing-service.service';

@Component({
  selector: 'app-budget-expenses-bank-statement-history',
  templateUrl: './budget-expenses-bank-statement-history.component.html',
  styleUrls: ['./budget-expenses-bank-statement-history.component.scss']
})
export class BudgetExpensesBankStatementHistoryComponent implements OnInit {

  file: any;


  fileContent: string;

  delimiter: string;

  statement_array: string[][];

  single_row: string[];

  constructor(private csvParsingService: CsvParsingServiceService) { 
  
  }

  ngOnInit(): void {
    this.delimiter = ';';
  }

  fileChanged(e: any) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file);
  }

  uploadDocument(file: any) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.fileContent = fileReader.result.toString();
      this.statement_array = this.csvParsingService.parseCsv(this.fileContent, this.delimiter);
      this.single_row = this.statement_array[0];
    }
    fileReader.readAsText(file);
  }

  submit_column_label_choice() {
    
  }

}
