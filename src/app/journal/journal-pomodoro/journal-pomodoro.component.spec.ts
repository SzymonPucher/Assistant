import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPomodoroComponent } from './journal-pomodoro.component';

describe('JournalPomodoroComponent', () => {
  let component: JournalPomodoroComponent;
  let fixture: ComponentFixture<JournalPomodoroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPomodoroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPomodoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
