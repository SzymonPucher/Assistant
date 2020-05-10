import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Utils from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public db: AngularFireDatabase) { }

  protected getList(path: string) {
    return this.db.list(path).valueChanges();
  }


  protected addOneDoc(obj: any, path: string){
    Object.keys(obj).forEach(key => {
      obj[key] = Utils.try_to_convert(obj[key])
    });
    return this.db.list(path).push(obj);
  }

  protected updateOneDoc(updatedObj: any, path: string) {

    Object.keys(updatedObj).forEach(key => {
      updatedObj[key] = Utils.try_to_convert(updatedObj[key])
    });

    return this.db.object(path).update(updatedObj);
  }
}
