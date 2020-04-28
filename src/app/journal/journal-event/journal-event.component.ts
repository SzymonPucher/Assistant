import { Component } from '@angular/core';

@Component({
  selector: 'app-journal-event',
  templateUrl: './journal-event.component.html',
  styleUrls: ['./journal-event.component.scss']
})
export class JournalEventComponent{

  fields: Array<any>;
  doc_path: string;

  constructor() { 
    this.fields = [
      {name: 'Name', type: 'text'},
      {name: 'Start', type: 'date'},
      {name: 'Finish', type: 'date'}
    ];
    this.doc_path = 'events';    
  }

  ngOnInit() {
  }

}
