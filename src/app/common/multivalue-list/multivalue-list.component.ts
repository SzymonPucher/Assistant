import { Component, OnInit, Input } from '@angular/core';
import { AngularFireList } from '@angular/fire/database'


@Component({
  selector: 'app-multivalue-list',
  templateUrl: './multivalue-list.component.html',
  styleUrls: ['./multivalue-list.component.scss']
})
export class MultivalueListComponent implements OnInit {

  @Input()
  elements: any;

  @Input()
  itemsRef: AngularFireList<any>;

  values: Array<any>;


  constructor() { 
    this.values = [];
  }

  ngOnInit() {
    Object.keys(this.elements).forEach(elem => {
      if(['Product', 'Price', 'Date'].includes(elem)) {
        let val = this.elements[elem] ? this.elements[elem] : 'NULL';
        this.values.push({label: elem, value: val});
      }
    });    
  }

  delete() {
    this.itemsRef.remove(this.elements.key);
  }
}
