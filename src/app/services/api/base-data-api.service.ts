import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Utils from '../../layout/shared/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseDataApiService {

  constructor(public db: AngularFireDatabase, public authService: AuthService) { }

  protected getList(subpath: string) {
    var fullPath = this.getFullPath(subpath);
    return this.db.list(fullPath).valueChanges();
  }

  protected getListWithKeys(subpath: string) {
    var fullPath = this.getFullPath(subpath);
    return this.db.list(fullPath).snapshotChanges();
  }

  public addOneDoc(obj: any, subpath: string){
    let newData = {};
    
    Object.keys(obj).forEach(key => {
      newData[key.toLowerCase()] = Utils.tryToConvert(obj[key])
    });

    var fullPath = this.getFullPath(subpath);
    console.log(fullPath);
    var id = obj.id;
    var dData = {}

    dData[obj.id] = obj.name;
    
    return this.db.object(fullPath).set(dData);
  
  }

  public updateOneDoc(updatedObj: any, subpath: string) {
    let newData = {};
    
    Object.keys(updatedObj).forEach(key => {
      newData[key.toLowerCase()] = Utils.tryToConvert(updatedObj[key])
    });

    var fullPath = this.getFullPath(subpath);
    return this.db.object(fullPath).update(newData);
  }

  public removeOneDoc(subpath: string) {
    var fullPath = this.getFullPath(subpath);
    return this.db.object(fullPath).remove();
  }

  private getFullPath(subpath: string): string {
    return `assistant/users/${this.authService.getCurrentUser()}/data/${subpath}`;
  }
}
