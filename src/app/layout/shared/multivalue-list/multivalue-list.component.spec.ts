import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultivalueListComponent } from './multivalue-list.component';

describe('MultivalueListComponent', () => {
  let component: MultivalueListComponent;
  let fixture: ComponentFixture<MultivalueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultivalueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultivalueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
