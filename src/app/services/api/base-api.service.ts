import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Utils from '../../layout/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(public db: AngularFireDatabase) { }

  protected getList(path: string) {
    return this.db.list(path).valueChanges();
  }

  protected getListWithKeys(path: string){
    return this.db.list(path).snapshotChanges();
  }

  public addOneDoc(obj: any, path: string){
    let newData = {};
    Object.keys(obj).forEach(key => {
      newData[key.toLowerCase()] = Utils.tryToConvert(obj[key])
    });
    return this.db.list(path).push(newData);
  }

  public updateOneDoc(updatedObj: any, path: string) {
    let newData = {};
    Object.keys(updatedObj).forEach(key => {
      newData[key.toLowerCase()] = Utils.tryToConvert(updatedObj[key])
    });
    return this.db.object(path).update(newData);
  }

  public removeOneDoc(path: string) {
    return this.db.object(path).remove();
  }
}
