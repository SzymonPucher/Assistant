import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { JournalService } from 'src/app/services/journal.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PomodoroEvent } from 'src/app/models/pomodoro-event';

@Component({
  selector: 'app-journal-pomodoro',
  templateUrl: './journal-pomodoro.component.html',
  styleUrls: ['./journal-pomodoro.component.scss'],
})
export class JournalPomodoroComponent {

  counter$: Observable<number>;

  pomodoroForm: FormGroup;

  isCounterRunning: boolean;

  constructor(public journalService: JournalService) {

    this.pomodoroForm = new FormGroup({
      category: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      minutes: new FormControl('', Validators.required),
    });

    this.isCounterRunning = false;
  }

  run_counter() {
    this.isCounterRunning = true;

    const category = this.pomodoroForm.value.category;
    const name = this.pomodoroForm.value.name;
    const start = new Date();
    const duration = this.pomodoroForm.value.minutes;

    let num = this.pomodoroForm.value.minutes * 60;

    this.counter$ = timer(0, 1000).pipe(
      take(num),
      map(() => {
        --num;
        if (num == 0) {

          this.journalService.addPomodoroEvent(
            new PomodoroEvent(category, name, start, duration)
          );

          this.isCounterRunning = false;
        }
        
        return num;
      })
    );
  }
}
