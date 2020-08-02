import { Component } from '@angular/core';
import { FieldSpec } from 'src/app/models/field-spec';
import { JournalApiService } from 'src/app/services/api/journal-api.service';
import { FieldType } from 'src/app/models/field-type';

@Component({
  selector: 'app-journal-event',
  templateUrl: './journal-event.component.html',
  styleUrls: ['./journal-event.component.scss']
})
export class JournalEventComponent{

  fields: Array<FieldSpec>;

  constructor(private journalService: JournalApiService) { 
    this.fields = [
      new FieldSpec('name', FieldType.text),
      new FieldSpec('start', FieldType.date),
      new FieldSpec('finish', FieldType.date)
    ];
  }

  public onSubmit(data: any): void {
    this.journalService.addEvent(data);
  }
}
