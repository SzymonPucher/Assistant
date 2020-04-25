import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-journal-pomodoro',
  templateUrl: './journal-pomodoro.component.html',
  styleUrls: ['./journal-pomodoro.component.scss']
})
export class JournalPomodoroComponent {

  counter$: Observable<number>;

  @ViewChild('minutes', { static: false }) minutes: ElementRef;
  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('category', { static: false }) category: ElementRef;




  constructor(public db: AngularFireDatabase) {
  }

  addEvent(num){
    let d = new Date();
    let date = `${d.getFullYear()}-${d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes()  < 10 ? '0' + d.getMinutes() : d.getMinutes()}`
    d = new Date(d.getTime() - num * 1000)
    let dates = `${d.getFullYear()}-${d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes()  < 10 ? '0' + d.getMinutes() : d.getMinutes()}`

    let event_data = {
      category: this.category.nativeElement.value,
      name: this.name.nativeElement.value,
      finish: date,
      start: dates,
      type: 'pomodoro'
    }
    console.log(event_data);
    this.db.list('events').push(event_data);
  }

  run_counter() {
    let num = this.minutes.nativeElement.value * 60;
    const num_unchanged = this.minutes.nativeElement.value * 60;
    this.counter$ = timer(0,1000).pipe(
      take(num),
      map(() => {
        --num;
        if (num==0){
          this.addEvent(num_unchanged);
        }
        return num;
      })
    );
  }


}
