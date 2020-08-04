import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { JournalApiService } from 'src/app/services/api/journal-api.service';

import { PomodoroEvent } from 'src/app/models/core/pomodoro-event';
import { FieldSpec } from 'src/app/models/field-spec';
import { FieldType } from 'src/app/models/field-type';
import { element } from 'protractor';
import Utils from '../../shared/utils';

@Component({
  selector: 'app-journal-pomodoro',
  templateUrl: './journal-pomodoro.component.html',
  styleUrls: ['./journal-pomodoro.component.scss'],
})
export class JournalPomodoroComponent implements OnInit {

  counter$: Observable<number>;

  isCounterRunning: boolean;

  fields: Array<FieldSpec>;

  pomodoros: Array<PomodoroEvent>;


  constructor(public journalApiService: JournalApiService) {

    this.isCounterRunning = false;


    this.fields = [
      new FieldSpec('category', FieldType.text),
      new FieldSpec('name', FieldType.text),
      new FieldSpec('minutes', FieldType.number)
    ]

    this.pomodoros = [];

  }

  ngOnInit() {
    this.journalApiService.getPomodoros().subscribe(pomodoro => {
      console.log(pomodoro);
      
      this.pomodoros = this.unique(pomodoro.map(p => new PomodoroEvent(p)))
      console.log(this.pomodoros);
      
    });
  }

  public unique(poms: Array<PomodoroEvent>) {
    poms = poms.filter((obj, pos, arr) => pos === arr.findIndex(o => (o.getHash() === obj.getHash())));
    return Utils.sortByProperty(poms, 'name');
  }

  run_counter(data: any): void {
    this.isCounterRunning = true;

    const category = data.category;
    const name = data.name;
    const start = Utils.getIsoDateString(new Date());
    const duration = data.minutes;

    let num = duration * 60;
        
    this.counter$ = timer(0, 1000).pipe(
      take(num),
      map(() => {
        --num;
        console.log(num);
        
        if (num == 0) {

          this.journalApiService.addPomodoroEvent(
            new PomodoroEvent({category, name, start, duration}).toDto()
          );

          this.isCounterRunning = false;
        }
        
        return num;
      })
    );
  }
}
