import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { PomodoroEvent } from '../../models/core/pomodoro-event';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JournalApiService extends BaseApiService {

  constructor(public db: AngularFireDatabase, public auth: AuthService) {
    super(db, auth);
  }

  public addPomodoroEvent(pomodoroEvent: PomodoroEvent) {
    return this.addOneDoc(pomodoroEvent, 'journal/pomodoro');
  }

  public getPomodoros() {
    return this.getList('journal/pomodoro')
  }

  public addEvent(eventData: any) {
    return this.addOneDoc(eventData, 'journal/events');
  }


}
