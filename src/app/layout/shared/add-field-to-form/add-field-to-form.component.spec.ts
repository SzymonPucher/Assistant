import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldToFormComponent } from './add-field-to-form.component';

describe('AddFieldToFormComponent', () => {
  let component: AddFieldToFormComponent;
  let fixture: ComponentFixture<AddFieldToFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFieldToFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldToFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
