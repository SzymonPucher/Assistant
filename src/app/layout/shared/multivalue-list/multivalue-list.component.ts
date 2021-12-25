import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-multivalue-list',
  templateUrl: './multivalue-list.component.html',
  styleUrls: ['./multivalue-list.component.scss']
})
export class MultivalueListComponent {

  @Input()
  items: any[];

  @Output()
  editClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteClicked: EventEmitter<any> = new EventEmitter<any>();

  edit(item: any): void {
    this.editClicked.emit(item);
  }

  delete(item: any): void {
    this.deleteClicked.emit(item);
  }
}
