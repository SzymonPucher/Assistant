import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Utils from '../../layout/shared/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(public db: AngularFireDatabase, public authService: AuthService) { }

  protected getList(subpath: string) {
    return this.db.list(subpath).valueChanges();
  }

  protected getListNew(subpath: string) {
    var fullPath = `assistant/users/${this.authService.getCurrentUser()}/data/${subpath}`
    return this.db.list(fullPath).valueChanges();
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
