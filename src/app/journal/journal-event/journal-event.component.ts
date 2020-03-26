import { Component, OnInit } from '@angular/core';
import { UniversalSimpleFormComponent } from './../../common/universal-simple-form/universal-simple-form.component';

@Component({
  selector: 'app-journal-event',
  templateUrl: './journal-event.component.html',
  styleUrls: ['./journal-event.component.scss']
})
export class JournalEventComponent implements OnInit {

  fields: string[];
  doc_path: string;

  constructor() { 
    this.fields = [
      'Name',
      'Start',
      'Finish'
    ];
    this.doc_path = 'events';    
  }

  ngOnInit() {
  }

}
