import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalSimpleFormComponent } from './universal-simple-form.component';

describe('UniversalSimpleFormComponent', () => {
  let component: UniversalSimpleFormComponent;
  let fixture: ComponentFixture<UniversalSimpleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalSimpleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
