import { Component, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-suggestion-input',
  templateUrl: './suggestion-input.component.html',
  styleUrls: ['./suggestion-input.component.scss']
})
export class SuggestionInputComponent {

  @Input('inputType')
  inputType: string;

  @Input('inpLabel')
  inpLabel: string;

  @ViewChild('label', { static: false }) label: ElementRef;

  @ViewChild('input', { static: false }) input: ElementRef;

  suggs: Array<String>;

  include: boolean;

  constructor() {
    this.include = true;
    this.suggs = [];
  }

  setLabel() {
    this.inpLabel = this.input.nativeElement.value;
  }

  setValue(val) {
    this.input.nativeElement.value = val;
    this.resetSuggestions();
  }

  getValue() {
    return this.input.nativeElement.value;
  }

  addSuggestion(sugg: String) {
    if (!this.suggs.includes(sugg)) {
      this.suggs.push(sugg);
    }
  }

  resetSuggestions() {
    while (this.suggs.length > 0) {
      this.suggs.pop();
    }
  }

  remove() {
    this.include = false;
  }
}
