import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { PomodoroEvent } from '../models/pomodoro-event';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends BaseService {

  constructor(public db: AngularFireDatabase) {
    super(db);
  }

  public addPomodoroEvent(pomodoroEvent: PomodoroEvent) {
    return this.addOneDoc(pomodoroEvent, 'journal/pomodoro');
  }

  public getPomodoros() {
    return this.getList('journal/pomodoro')
  }


}
